// Seleciona os links de navegação
const navLinks = document.querySelectorAll(".nav-link");

// Função para destacar o link ativo com base na rolagem
function highlightNavLink() {
    let scrollPosition = window.scrollY + window.innerHeight / 3;

    navLinks.forEach(link => {
        const sectionId = link.getAttribute("href").substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                link.classList.add("active");
            }
        }
    });
}

// Adiciona o evento de scroll
window.addEventListener("scroll", highlightNavLink);

// Destaca o link ao clicar
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(link => link.classList.remove("active")); // Remove o 'active' de todos
        this.classList.add("active"); // Adiciona ao link clicado
    });
});

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link

        const sectionId = this.getAttribute("href").substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
            window.scrollTo({
                top: section.offsetTop,
                behavior: "smooth" // Faz a rolagem suave
            });
        }

        // Atualiza o destaque do link
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
    });
});




