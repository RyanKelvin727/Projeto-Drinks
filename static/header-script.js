// Seleciona os blocos de conteúdo e os links de navegação
const sections = document.querySelectorAll("main > div[id]");
const navLinks = document.querySelectorAll(".nav-link");

// Função para verificar a posição do scroll e destacar o link ativo
function highlightNavLink() {
    let scrollPosition = window.scrollY + window.innerHeight / 3; // Adiciona margem para considerar seções no meio da tela

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Verifica se o scroll está dentro da seção
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove a classe 'active' de todos os links
            navLinks.forEach(link => link.classList.remove("active"));
            // Adiciona a classe 'active' ao link correspondente
            navLinks[index].classList.add("active");
        }
    });
}

// Adiciona o evento de scroll
window.addEventListener("scroll", highlightNavLink);


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

