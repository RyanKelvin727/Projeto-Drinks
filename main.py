from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produtos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Modelo Produto
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    tamanho = db.Column(db.Float, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    preco_desconto = db.Column(db.Float, nullable=True) 
    image_url = db.Column(db.String(200), nullable=False)

# Rota inicial - listar produtos
@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)

@app.route('/item/<int:id>')
def item(id):
    produto = Produto.query.get_or_404(id)
    return render_template('item.html', produto=produto)


# Rota para criar, editar ou excluir produtos
@app.route('/crud', methods=['GET', 'POST'])
@app.route('/crud/<int:id>', methods=['GET', 'POST'])
def crud(id=None):
    produto = Produto.query.get(id) if id else None
    

    if request.method == 'POST':
        nome = request.form['nome']
        descricao = request.form['descricao']
        preco = float(request.form['preco'])
        preco_desconto = float(request.form['preco_desconto']) if request.form.get('preco_desconto') else preco
        image_url = request.form['image_url']
        tamanho = float(request.form['tamanho'])
        
        if produto:
            # Se o produto existir, edita
            produto.nome = nome
            produto.descricao = descricao
            produto.preco = preco
            produto.preco_desconto = preco_desconto
            produto.image_url = image_url
            produto.tamanho = tamanho 
        else:
            # Se não existir produto, cria um novo
            novo_produto = Produto(nome=nome, descricao=descricao, preco=preco, preco_desconto=preco_desconto, image_url=image_url, tamanho=tamanho)
            db.session.add(novo_produto)
        
        db.session.commit()
        return redirect(url_for('index'))  # Redireciona para a página inicial após salvar ou editar o produto

    return render_template('crud.html', produto=produto)  # Passa o produto (se houver) para o template



    # # Se for GET, mostra o formulário de CRUD
    # produto_id = request.args.get('id')
    # produto = Produto.query.get(produto_id) if produto_id else None
    # return render_template('crud.html', produto=produto)


# Rota para excluir um produto
@app.route('/delete/<int:id>', methods=['POST'])
def delete(id):
    produto = Produto.query.get_or_404(id)
    db.session.delete(produto)
    db.session.commit()
    return redirect(url_for('index'))

# Cria o banco de dados
if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)
