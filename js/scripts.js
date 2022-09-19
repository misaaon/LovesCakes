const btn = document.querySelector('a');
const menuNavegacion = document.querySelector('.contenedor__menu--lista');
const btnCerrar = document.querySelector('.boton-cerrar');
const btnWsp = document.querySelector('.btn-wsp');
const clientes = document.querySelector('#clientes');

registroDeEventos();
function registroDeEventos() {
    btn.addEventListener('click', mostrarMenu);
    btnCerrar.addEventListener('click', cerrarMenu);
    window.addEventListener('scroll', quitarWsp)
}

function mostrarMenu(e) {
    if(e.target) {
        menuNavegacion.classList.add('active');
        btnWsp.style.display = 'none'
    }
}

function cerrarMenu(e) {
    menuNavegacion.classList.remove('active');
    btnWsp.style.display = 'block'
}

function quitarWsp() {
    const ubicacion = clientes.getBoundingClientRect();
    if(ubicacion.top < -777) {
        btnWsp.style.display = 'none'
    } else {
        btnWsp.style.display = 'block'
    }
}

