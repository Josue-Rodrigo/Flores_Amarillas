// Título "Feliz Día de las Flores Amarillas" letra por letra,
// sincronizado con el crecimiento de las flores
var titulo = document.querySelector(".titulo");
if (titulo) {
  var texto = titulo.textContent.trim();
  titulo.textContent = "";
  titulo.style.opacity = "1";

  var inicio = 0.6; // segundos antes de empezar
  var paso = 0.18; // segundos entre cada letra

  var palabra = null;
  for (var i = 0; i < texto.length; i++) {
    if (texto[i] === " ") {
      palabra = null;
      titulo.appendChild(document.createTextNode(" "));
      continue;
    }
    if (!palabra) {
      palabra = document.createElement("span");
      palabra.className = "palabra";
      titulo.appendChild(palabra);
    }
    var el = document.createElement("span");
    el.className = "letra";
    el.textContent = texto[i];
    el.style.setProperty("--d", (inicio + i * paso).toFixed(2) + "s");
    palabra.appendChild(el);
  }
}

//funcion titulo
// Función para ocultar el título después de 216 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation =
    "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
  setTimeout(function () {
    titulo.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(ocultarTitulo, 216000);