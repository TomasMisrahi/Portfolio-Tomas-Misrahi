/*Funcionalidad para flecha hacia arrriba*/

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

/*Funcionalidad de redirección al clickear las cards del form*/

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