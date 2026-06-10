// MOBILE NAVIGATION

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// HEADER SHADOW

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    header.style.boxShadow =
    "0 0 20px rgba(255,255,255,0.05)";

  }

  else{

    header.style.boxShadow = "none";

  }

});

// SIMPLE FADE IN ANIMATION

const cards = document.querySelectorAll(
  ".skill-card, .project-card, .contact-item"
);

cards.forEach((card, index) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "0.6s ease";

  setTimeout(() => {

    card.style.opacity = "1";
    card.style.transform = "translateY(0)";

  }, index * 150);

});

const canvas = document.getElementById("topography");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let t = 0;

function draw() {

  t += 0.003;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;

  const lines = 45;
  const spacing = canvas.height / lines;

  for (let i = -5; i < lines + 5; i++) {

    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x += 10) {

      const y =
        i * spacing +
        Math.sin(x * 0.006 + t) * 25 +
        Math.sin(x * 0.002 + i * 0.4 + t * 0.7) * 40 +
        Math.cos(x * 0.003 + t * 0.5) * 20;

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

    }

    ctx.stroke();

  }

  requestAnimationFrame(draw);
}

draw();