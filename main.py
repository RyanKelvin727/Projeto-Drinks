from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produtos.db'  # Banco de dados SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo Produto
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    preco = db.Column(db.Float, nullable=False)
    preco_desconto = db.Column(db.Float, nullable=True)  # Novo campo para preço com desconto
    image_url = db.Column(db.String(200), nullable=False)

# Rota inicial - listar produtos
@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)

@app.route('/item/<int:id>')
def item(id):
    produto = Produto.query.get_or_404(id)  # Obtém o produto pelo ID
    return render_template('item.html', produto=produto)  # Passa o produto para o template item.html


# Rota para criar, editar ou excluir produtos - CRUD em um único arquivo
@app.route('/crud', methods=['GET', 'POST'])
def crud():
    if request.method == 'POST':
        nome = request.form['nome']
        descricao = request.form['descricao']
        preco = float(request.form['preco'])
        preco_desconto = float(request.form['preco_desconto']) if request.form.get('preco_desconto') else preco  # Preço com desconto
        image_url = request.form['image_url']
        
        # Verifica se estamos criando ou editando
        id_produto = request.form.get('id')
        if id_produto:
            produto = Produto.query.get(id_produto)
            produto.nome = nome
            produto.descricao = descricao
            produto.preco = preco
            produto.preco_desconto = preco_desconto
            produto.image_url = image_url
        else:
            novo_produto = Produto(nome=nome, descricao=descricao, preco=preco, preco_desconto=preco_desconto, image_url=image_url)
            db.session.add(novo_produto)
        
        db.session.commit()
        return redirect(url_for('index'))

    # Se for GET, mostra o formulário de CRUD
    produto_id = request.args.get('id')
    produto = Produto.query.get(produto_id) if produto_id else None
    return render_template('crud.html', produto=produto)


# Rota para excluir um produto
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    produto = Produto.query.get_or_404(id)
    db.session.delete(produto)
    db.session.commit()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Cria o banco de dados
    app.run(debug=True)
