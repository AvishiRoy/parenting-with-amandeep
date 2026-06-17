// Mobile Menu

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-open");
  });
}

// Sticky Navbar Shadow

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
});

// Counter Animation

const counters = document.querySelectorAll(".milestone__number");

const startCounter = (counter) => {
  const target = +counter.dataset.count;
  const suffix = counter.dataset.suffix || "";
  let count = 0;

  const update = () => {
    count += Math.ceil(target / 100);

    if (count >= target) {
      counter.textContent = target + suffix;
    } else {
      counter.textContent = count + suffix;
      requestAnimationFrame(update);
    }
  };

  update();
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      startCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

counters.forEach(counter => observer.observe(counter));

// Testimonials

const track = document.getElementById("testimonialTrack");

if(track){

let currentSlide = 0;

const slides = document.querySelectorAll(".testimonial-card");

setInterval(() => {
  currentSlide++;

  if(currentSlide >= slides.length){
    currentSlide = 0;
  }

  track.style.transform =
    `translateX(-${currentSlide * 100}%)`;

}, 5000);

}