from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///produtos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db = SQLAlchemy(app)

# Modelo Produto
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    tamanho = db.Column(db.Float, nullable=False)
    preco = db.Column(db.Float, nullable=False)
    preco_desconto = db.Column(db.Float, nullable=True)
    image = db.Column(db.String(250), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)  # Adicionando a categoria

# Modelo Compra
class Compra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_comprador = db.Column(db.String(100), nullable=False)
    matricula = db.Column(db.String(20), nullable=False)
    produto_id = db.Column(db.Integer, db.ForeignKey('produto.id'), nullable=False)
    produto = db.relationship('Produto', backref=db.backref('compras', lazy=True))

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
        image = request.files['image']
        tamanho = float(request.form['tamanho'])
        categoria = request.form['categoria']  # Pegando a categoria do formulário

        image_path = f'{app.config["UPLOAD_FOLDER"]}/{secure_filename(image.filename)}'

        if image_path != 'static/uploads/':
            image_path = image_path
        else:
            image_path = produto.image

        if produto:
            produto.nome = nome
            produto.descricao = descricao
            produto.preco = preco
            produto.preco_desconto = preco_desconto
            produto.image = image_path
            produto.tamanho = tamanho
            produto.categoria = categoria  # Atualizando a categoria
        else:
            novo_produto = Produto(nome=nome, descricao=descricao, preco=preco, preco_desconto=preco_desconto, image=image_path, tamanho=tamanho, categoria=categoria)
            db.session.add(novo_produto)
        
        image.save(image_path)
        db.session.commit()
        return redirect(url_for('index'))
    
    produtos = Produto.query.all()
    return render_template('crud.html', produto=produto, produtos=produtos)

# Rota para excluir um produto
@app.route('/delete/<int:id>', methods=['GET'])
def delete(id):
    produto = Produto.query.get_or_404(id)
    db.session.delete(produto)
    db.session.commit()
    return redirect(url_for('listagem'))

# Rota para ver o item maior
@app.route('/item/<int:id>')
def item(id):
    produto = Produto.query.get_or_404(id)
    return render_template('item.html', produto=produto)

# Rota inicial - listar produtos
@app.route('/')
def index():
    produtos = Produto.query.all()
    return render_template('index.html', produtos=produtos)

# Rota para realizar a compra
@app.route('/comprar/<int:produto_id>', methods=['GET', 'POST'])
def comprar(produto_id):
    produto = Produto.query.get_or_404(produto_id)

    if request.method == 'POST':
        nome_comprador = request.form['nome']
        matricula = request.form['matricula']
        
        # Salva os dados da compra no banco
        nova_compra = Compra(nome_comprador=nome_comprador, matricula=matricula, produto_id=produto.id)
        db.session.add(nova_compra)
        db.session.commit()

        return redirect(url_for('index'))

    return render_template('comprar.html', produto=produto)

# Rota para ver a lista de clientes
@app.route('/clientes')
def listar_compras():
    compras = Compra.query.all()
    return render_template('clientes.html', compras=compras)

# Rota para excluir um cliente
@app.route('/excluir_compra/<int:id>', methods=['POST'])
def excluir_compra(id):
    compra = Compra.query.get_or_404(id)
    db.session.delete(compra)
    db.session.commit()
    return redirect(url_for('listar_compras'))

# Cria o banco de dados
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
