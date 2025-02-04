document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".tipos");
    const items = document.querySelectorAll(".crdp-item");
    let activeFilter = null; // Para rastrear o filtro ativo
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
  
        // Alternar o filtro ativo
        if (activeFilter === filter) {
          activeFilter = null; // Remover o filtro
          showAllItems(); // Mostrar todos os itens
        } else {
          activeFilter = filter; // Atualizar o filtro ativo
          filterItems(filter); // Filtrar itens
        }
      });
    });
  
    // Filtra os itens com a categoria selecionada
    function filterItems(filter) {
      items.forEach(item => {
        if (item.classList.contains(filter)) {
          fadeIn(item); // Se o item tiver a categoria, mostre-o
        } else {
          fadeOut(item); // Caso contrário, esconda
        }
      });
    }
  
    // Mostra todos os itens
    function showAllItems() {
      items.forEach(item => fadeIn(item)); // Mostra todos os itens
    }
  
    function fadeIn(element) {
      element.style.display = "block"; // Garante que o item seja exibido como flex
      setTimeout(() => {
        element.style.opacity = "1"; // Aumenta a opacidade
      }, 0);
    }
  
    function fadeOut(element) {
      element.style.opacity = "0"; // Diminuir a opacidade
      setTimeout(() => {
        element.style.display = "none"; // Esconde após o fade
      }, 500); // Tempo igual ao do fade (0.5s)
    }
  
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

