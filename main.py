from flask import Flask, render_template

# Configuração do Flask e do banco de dados
app = Flask(__name__)

# Rota para a página inicial (listar itens)
@app.route("/")
def index():
    return render_template("index.html")

# Rota para exibir detalhes de um item
@app.route("/item")
def item():
    return render_template("item.html")

# Inicializar o banco de dados
if __name__ == "__main__":
    app.run(debug=True)