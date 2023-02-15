const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
const leerTweets = document.querySelector('#tweet');
const inputSubmit = document.querySelector('#inputEnviar')

let tweets = [];

/* EVENTOS */

eventListeners();

/* FUNCIONES */
function eventListeners() {

    leerTweets.addEventListener("input", (e) => {
        console.log(e.target.value);
        if (e.target.value.trim() != "") {
            inputSubmit.disabled = false;
            inputSubmit.classList.add('button-primary');
            inputSubmit.classList.remove('button-dark');
        }
    });
    /* CUANDO EL USUARIO AGREGA UN NUEVO TWEET */
    formulario.addEventListener('submit', agregarTweet);

    /* CUANDO EL DOCUMENTO ESTA LISTO */
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    })
}

function agregarTweet(e) {
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    /* VALIDACION SI ES QUE NO HAY TEXTO */
    if (tweet === '') {
        mostrarError("Un mensaje no puede ir vacio");
        return; /* evita que se ejecuten mas linea de codigo */
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }


    /* AÑADIR AL ARREGLO DE TWEETS  */
    tweets = [...tweets, tweetObj];

    crearHTML();

    /* REINICIAR EL FORMULARIO */
    formulario.reset();
    inputSubmit.disabled = true;
    inputSubmit.classList.remove('button-primary');
    inputSubmit.classList.add('button-dark');
}

function mostrarError(error) {
    const mensajeError = document.createElement("P");
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    /* INSERTARLO EN EL CONTENIDO */
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.classList.add('borde-li');
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id != id);
    crearHTML();
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}