// Exibe a mensagem de sucesso quando necessário
window.addEventListener('load', function () {
    // Verifica se o sinal "compra-feita" existe no localStorage
    if (localStorage.getItem('compra-feita') === 'true') {
        const mensagemSucesso = document.getElementById('mensagem-sucesso');
        if (mensagemSucesso) {
            mensagemSucesso.style.display = 'flex'; // Mostra o div
            setTimeout(function () {
                mensagemSucesso.style.display = 'none'; // Esconde após 4 segundos
                localStorage.removeItem('compra-feita'); // Remove o sinal de compra
            }, 4000);
        }
    }
});



// Script do botão de comprar
document.querySelector('.btn-comprar').addEventListener('click', function () {
    localStorage.setItem('compra-feita', 'true'); // Sinaliza a compra
    window.location.href = '/'; // Redireciona para a página principal
});

console.log('Compra feita:', localStorage.getItem('compra-feita'));
