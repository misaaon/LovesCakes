const btn = document.querySelector('a');
const menuNavegacion = document.querySelector('.contenedor__menu--lista');
const btnCerrar = document.querySelector('.boton-cerrar');
const btnWsp = document.querySelector('.btn-wsp');
const clientes = document.querySelector('#clientes');
const formulario = document.querySelector('#formulario');
const cajaComentario = document.querySelector('#comentarios');
const btnEnviar = document.querySelector('#btn-submit');
const cabecera = document.querySelector('.cabecera');
let comentarios = [];

registroDeEventos();
function registroDeEventos() {
    btn.addEventListener('click', mostrarMenu);
    btnCerrar.addEventListener('click', cerrarMenu);
    window.addEventListener('scroll', quitarWsp)
    formulario.addEventListener('submit', agregarComentario)
    document.addEventListener('DOMContentLoaded', () => {
        comentarios = JSON.parse(localStorage.getItem('comentario')) || [];
        mostrarComentario();
    })
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

function agregarComentario(e) {
    e.preventDefault();
    const valorComentario = document.querySelector('#comentario').value;
    const nombre = document.querySelector('#nombre').value;
    if(valorComentario === '' || nombre === '') {
        mensajeError('Todos los campos son obligatorios');
        return;
    }
    const comentarioObj = {
        id: Date.now(),
        nombre,
        comentario: valorComentario
    };
    comentarios = [...comentarios, comentarioObj];
    mostrarComentario();
}

// Mensaje de error
function mensajeError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    formulario.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove();
    }, 3000)
}

//Mostrar comentario en el HTML
function mostrarComentario() {
    limpiarHTML();

    if(comentarios.length > 0) {
        comentarios.forEach(comentario => {
            const comentarios2 = document.createElement('p');
            comentarios2.innerHTML = `${comentario.nombre}: <br/> ${comentario.comentario}`
            cajaComentario.appendChild(comentarios2);
        })
    }
    sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
    localStorage.setItem('comentario', JSON.stringify(comentarios));
}

function limpiarHTML() {
    while(cajaComentario.firstChild) {
        cajaComentario.removeChild(cajaComentario.firstChild);
    }
}