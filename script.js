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
