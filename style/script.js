document.addEventListener('DOMContentLoaded', () => {
    const quantidadeInput = document.getElementById('quantidade');
    const botarButton = document.getElementById('botar');
    const tirarButton = document.getElementById('tirar');

    botarButton.addEventListener('click', () => {
        let currentValue = parseInt(quantidadeInput.value);
        quantidadeInput.value = currentValue + 1;
    });

    tirarButton.addEventListener('click', () => {
        let currentValue = parseInt(quantidadeInput.value);
        if (currentValue > 1) {
                quantidadeInput.value = currentValue - 1;
        }
    });
});

document.getElementById("ver-mais").addEventListener("click", function() {
    // Torna os itens ocultos visíveis
    var itensEscondidos = document.querySelector(".conteudo-cardapio .escondido");
    if (itensEscondidos) {
        itensEscondidos.classList.remove("escondido"); // Remove a classe 'escondido' para tornar os itens visíveis
    }

    // Esconde o botão "Ver mais" após o clique
    this.style.display = "none";
});


let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(()=> {next.click()}, 3000);

function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})

window.onresize = function(event) {
    reloadSlider();
};

// SCRIPT PARA ABRIR MENU MOBILE

function menuAbrir() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "/assets/bars-solid.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "/assets/x-solid.svg";
    }
}




