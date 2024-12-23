//Funcionalidad para flecha hacia arrriba

window.onscroll = function () {
    if (document.documentElement.scrollTop > 150) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


//MENU HEADER HAMBURGUESA
//Funcionalidad del menu hamburguesa

const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const textosHeader = document.querySelectorAll('.cv a, .header-1 nav ul');

let isVisible = false;

// Para que desaparezca <= 1100
function cerrarMenuEnMobile() {
    if (window.innerWidth <= 1100) {
        textosHeader.forEach(th => {
            th.style.display = 'none';
        });
        isVisible = false;
    }
}

// Llamar a la función al cargar la página
cerrarMenuEnMobile();

menuHamburguesa.addEventListener('click', () => {
    if (window.innerWidth <= 1100) {
        isVisible = !isVisible;
        textosHeader.forEach(th => {
            th.style.display = isVisible ? 'flex' : 'none';
        });
    }
});

// Para que reaparezca > 1100
window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
        textosHeader.forEach(th => {
            th.style.display = 'flex';
        });
        isVisible = false;
    } else if (!isVisible) {
        textosHeader.forEach(th => {
            th.style.display = 'none';
        });
    }
});


//FILTRADO PORTFOLIO
//Interacciones de botones y su filtrado

var botonMostrarTodo = document.getElementById('boton-mostrar-todo');
var botonDiseñoWeb = document.getElementById('boton-diseño-web');
var diseñoWeb = document.getElementById('diseño-web');
var botonDiseñoGrafico = document.getElementById('boton-diseño-grafico');
var diseñoGrafico = document.getElementById('diseño-grafico');

botonMostrarTodo.addEventListener('click', function () {
    diseñoWeb.style.display = 'flex';
    diseñoGrafico.style.display = 'flex';
});

botonDiseñoWeb.addEventListener('click', function () {
    diseñoGrafico.style.display = 'none';
    diseñoWeb.style.display = 'flex';
});

botonDiseñoGrafico.addEventListener('click', function () {
    diseñoWeb.style.display = 'none';
    diseñoGrafico.style.display = 'flex';
});


//FORMULARIO
//Funcionalidad de redirección al clickear las cards del form

function redirect(element) {
    var url = element.getAttribute('data-url');
    window.open(url, '_blank');
}

/*Funcionalidad correcta del selector de opciones en el formulario*/

// Obtener elementos del DOM
var botonDesplegableForm = document.querySelector('.boton-desplegable-form');
var menuOpcionesForm = document.querySelector('.menu-opciones-form');
var checkboxes = document.querySelectorAll('.menu-opciones-form input[type="checkbox"]');

// Mostrar y ocultar el menú desplegable al hacer clic en el botón
botonDesplegableForm.addEventListener('click', function () {
    menuOpcionesForm.style.display = (menuOpcionesForm.style.display === 'none' || menuOpcionesForm.style.display === '') ? 'block' : 'none';
});

// Manejar el cambio en los checkboxes
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        updateButtonText();
    });
});

// Función para actualizar el texto del botón
function updateButtonText() {
    var checkedCheckboxes = document.querySelectorAll('.menu-opciones-form input[type="checkbox"]:checked');
    if (checkedCheckboxes.length > 0) {
        botonDesplegableForm.textContent = checkedCheckboxes.length + ' seleccionado/s';
    } else {
        botonDesplegableForm.textContent = 'Seleccioná el/los servicios de interes';
    }
}

// Cerrar el menú desplegable al hacer clic fuera de él
document.addEventListener('click', function (event) {
    if (!event.target.closest('.menu-desplegable-form')) {
        menuOpcionesForm.style.display = 'none';
    }
});