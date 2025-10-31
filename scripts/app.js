console.log("E-Commerce Website Loaded");

// Select elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle navigation menu on mobile
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


//Add Smooth Scroll for the Button
const ctaButton = document.querySelector(".cta-btn");

ctaButton.addEventListener("click", () => {
  window.scrollTo({
    top: 700, // Adjust this value later when you add sections
    behavior: "smooth"
  });
});
