// Script do botão para adicionar mais produtos (Cardapio)
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



// Script do botão "Ver mais" (Cardápio)
document.getElementById("ver-mais").addEventListener("click", function() {
    var itensEscondidos = document.querySelector(".conteudo-cardapio .escondido");
    if (itensEscondidos) {
        itensEscondidos.classList.remove("escondido");
    }

    this.style.display = "none";
});



// Script do menu para celulares
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLink = document.querySelectorAll('.nav-item a');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
});

navLink.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('open');
    });
});



// Script do carrossel de ofertas
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