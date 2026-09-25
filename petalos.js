// Pétalos amarillos cayendo mientras florecen las flores
(function () {
  var canvas = document.getElementById("petalos");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  var W = 0;
  var H = 0;
  var DPR = 1;

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize);

  var colores = ["#ffd23f", "#ffb400", "#ffea70", "#ffc94d", "#f7c548"];
  var petalas = [];
  var objetivo = 26;

  function nueva(desdeArriba) {
    var size = 7 + Math.random() * 10;
    return {
      x: Math.random() * (W + 80) - 40,
      y: desdeArriba ? -20 : Math.random() * H,
      w: size,
      h: size * 0.55,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.03,
      vy: 0.5 + Math.random() * 1 + H * 0.001,
      sway: Math.random() * Math.PI * 2,
      sp: 0.5 + Math.random() * 1.2,
      color: colores[(Math.random() * colores.length) | 0],
      a: 0.35 + Math.random() * 0.35,
      tw: Math.random() * Math.PI * 2,
      twsp: 0.5 + Math.random() * 1
    };
  }

  var t0 = 0;
  var empezado = false;

  function iniciar() {
    if (empezado) return;
    empezado = true;
    t0 = performance.now();
    requestAnimationFrame(loop);
  }

  function loop(now) {
    var t = (now - t0) * 0.001;
    ctx.clearRect(0, 0, W, H);

    if (petalas.length < objetivo && t > 0.5 && Math.random() < 0.08) {
      petalas.push(nueva(true));
    }

    for (var i = petalas.length - 1; i >= 0; i--) {
      var p = petalas[i];
      p.y += p.vy;
      p.x += Math.sin(t * p.sp + p.sway) * 0.6;
      p.rot += p.vr;

      if (p.y > H + 30 || p.x < -70 || p.x > W + 70) {
        petalas.splice(i, 1);
        continue;
      }

      var alpha = p.a * (0.75 + 0.25 * Math.sin(t * p.twsp + p.tw));
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = alpha;

      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.w);
      g.addColorStop(0, "#fff4b0");
      g.addColorStop(0.55, p.color);
      g.addColorStop(1, "#e8890c");
      ctx.fillStyle = g;

      ctx.beginPath();
      ctx.ellipse(0, 0, p.w * 0.5, p.h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  resize();
  window.iniciarPetalos = iniciar;
})();