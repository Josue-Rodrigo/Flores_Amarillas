document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("container");
  if (window.iniciarPetalos) window.iniciarPetalos();
});

document.addEventListener("click", function (e) {
  if (!e.target.closest(".flowers")) return;

  var musica = document.getElementById("musica");
  if (musica && musica.paused) {
    var p = musica.play();
    if (p && p.catch) p.catch(function () {});
  }

  var actual = document.getElementById("mensaje-activo");
  if (actual) actual.remove();

  contador += 1;
  var usarNombres = contador === 1 || (contador - 1) % 5 === 0;
  var idx;
  if (usarNombres) {
    do {
      idx = Math.floor(Math.random() * mensajesNombres.length);
    } while (mensajesNombres.length > 1 && idx === ultimoNombre);
    ultimoNombre = idx;
    mostrarMensaje(e.clientX, e.clientY, mensajesNombres[idx]);
  } else {
    do {
      idx = Math.floor(Math.random() * mensajes.length);
    } while (mensajes.length > 1 && idx === ultimoMensaje);
    ultimoMensaje = idx;
    mostrarMensaje(e.clientX, e.clientY, mensajes[idx]);
  }
});

var mensajes = [
  "Eres pura alegría",
  "Luz en mi vida",
  "Flor de mi corazón",
  "Tu sonrisa ilumina mis días",
  "Te quiero muchísimo",
  "Eres mi sol de enero",
  "Contigo todo florece",
  "Mi persona favorita",
  "Cada día brillas más",
  "Eres mi sueño cumplido",
  "Nada me hace más feliz que tú",
  "Eres especial para mí",
  "Bella por dentro y por fuera",
  "Eres mi lugar favorito",
  "Mi corazón late por ti",
  "Siempre estaré para ti",
  "Gracias por existir",
  "Eres mi paz",
  "Mi mundo es mejor contigo",
  "Donde estés, está mi sonrisa"
];

var mensajesNombres = [
  "Carla y Arleth, las quiero muchísimo",
  "Carla y Arleth, son lo más bonito",
  "Carla y Arleth, las amo con todo mi corazón",
  "Carla y Arleth, no se imaginan cuánto las quiero",
  "Carla y Arleth, siempre serán mi alegría",
  "Carla y Arleth, son mi tesoro",
  "Carla y Arleth, les sonrío la vida",
  "Carla y Arleth, son el regalo de mi vida"
];

var ultimoNombre = -1;

var ultimoMensaje = -1;

var contador = 0;

function mostrarMensaje(x, y, texto) {
  var m = document.createElement("div");
  m.className = "mensaje-flor";
  m.id = "mensaje-activo";
  m.textContent = texto;

  var margen = 80;
  var maxX = Math.max(margen, window.innerWidth - margen);
  var cx = Math.max(margen, Math.min(x, maxX));
  var ty = Math.max(130, Math.min(y, window.innerHeight - 40));

  m.style.left = cx + "px";
  m.style.top = ty + "px";
  document.body.appendChild(m);
  setTimeout(function () {
    m.remove();
  }, 2700);
}