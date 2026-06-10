// MOBILE NAVIGATION
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// HEADER SHADOW
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 50
    ? "0 0 20px rgba(255,255,255,0.05)"
    : "none";
});

// SIMPLE FADE IN ANIMATION
const cards = document.querySelectorAll(".skill-card, .project-card, .contact-item");
cards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "0.6s ease";
  setTimeout(() => {
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, index * 150);
});

// INTERACTIVE BACKGROUND CANVAS
const canvas = document.getElementById("topography");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Mouse / touch tracking
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
const target = { x: canvas.width / 2, y: canvas.height / 2 };
const smooth = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener("mousemove", e => {
  target.x = e.clientX;
  target.y = e.clientY;
});
window.addEventListener("touchmove", e => {
  target.x = e.touches[0].clientX;
  target.y = e.touches[0].clientY;
}, { passive: true });

// Ripple on click
const ripples = [];
window.addEventListener("click", e => {
  ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.6 });
});

let t = 0;

function draw() {
  t += 0.003;

  // Smoothly lerp cursor position
  smooth.x += (target.x - smooth.x) * 0.06;
  smooth.y += (target.y - smooth.y) * 0.06;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const lines = 45;
  const spacing = canvas.height / lines;

  for (let i = -5; i < lines + 5; i++) {
    ctx.beginPath();

    for (let x = 0; x <= canvas.width; x += 8) {
      // Base wave
      let y =
        i * spacing +
        Math.sin(x * 0.006 + t) * 25 +
        Math.sin(x * 0.002 + i * 0.4 + t * 0.7) * 40 +
        Math.cos(x * 0.003 + t * 0.5) * 20;

      // Cursor distortion — bulge lines near cursor
      const dx = x - smooth.x;
      const dy = y - smooth.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 180;
      const strength = 55;
      if (dist < radius) {
        const factor = (1 - dist / radius);
        const push = Math.sin(factor * Math.PI) * strength;
        y -= push * factor;
      }

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    // Color lines closer to cursor more brightly
    const lineY = i * spacing;
    const dy = lineY - smooth.y;
    const lineDist = Math.abs(dy);
    const glow = Math.max(0, 1 - lineDist / 200);
    const alpha = 0.12 + glow * 0.55;
    const r = Math.round(127 + glow * 80);
    const g = Math.round(119 + glow * 30);
    const b = 221;
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = 1 + glow * 1.5;
    ctx.stroke();
  }

  // Draw click ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    const rp = ripples[i];
    rp.r += 6;
    rp.alpha -= 0.018;
    if (rp.alpha <= 0) { ripples.splice(i, 1); continue; }
    ctx.beginPath();
    ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(175,169,236,${rp.alpha})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

draw();
