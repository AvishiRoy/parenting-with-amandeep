// Mobile Menu

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
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

// ======================================
// SUCCESS STORIES TABS
// ======================================

const ssTabs = document.querySelectorAll(".ss-tab");
const ssPanels = document.querySelectorAll(".ss-panel");

ssTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        ssTabs.forEach(t => t.classList.remove("is-active"));
        ssPanels.forEach(p => p.classList.remove("is-active"));

        tab.classList.add("is-active");

        const panel = document.getElementById("tab-" + tab.dataset.tab);

        if(panel){
            panel.classList.add("is-active");
        }

    });

});


// ======================================
// LIGHTBOX
// ======================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCounter = document.getElementById("lightboxCounter");

let galleryImages = [];
let currentIndex = 0;

document.querySelectorAll(".photo-grid, .eg-grid").forEach(grid=>{

    const cards = grid.querySelectorAll(".photo-card, .eg-item");

    cards.forEach((card,index)=>{

        card.addEventListener("click", () => {

            galleryImages = [...cards].map(c => {

                const img = c.querySelector("img");

                return {

                    src: img.src,
                    alt: img.alt

                };

            });

          currentIndex = [...cards].indexOf(card);

          openLightbox();


        });

    });

});

function openLightbox(){

    updateImage();

    lightbox.removeAttribute("hidden");

    document.body.style.overflow="hidden";

}

function closeLightbox(){

    lightbox.setAttribute("hidden","");

    document.body.style.overflow="";

}

function updateImage(){

    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;

    lightboxCounter.textContent =
    `${currentIndex+1} / ${galleryImages.length}`;

}

lightboxClose?.addEventListener("click",closeLightbox);

lightbox?.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

lightboxPrev?.addEventListener("click",()=>{

    if(currentIndex>0){

        currentIndex--;

        updateImage();

    }

});

lightboxNext?.addEventListener("click",()=>{

    if(currentIndex<galleryImages.length-1){

        currentIndex++;

        updateImage();

    }

});

document.addEventListener("keydown",(e)=>{

    if(lightbox.hasAttribute("hidden")) return;

    if(e.key==="Escape") closeLightbox();

    if(e.key==="ArrowLeft" && currentIndex>0){

        currentIndex--;

        updateImage();

    }

    if(e.key==="ArrowRight" && currentIndex<galleryImages.length-1){

        currentIndex++;

        updateImage();

    }

});

/* ----------------------------------------------------------------
   1. JCI STAT COUNTER ANIMATION
   Counts up to the number in data-jci-count when the card scrolls
   into view. Uses its own IntersectionObserver instance.
   The fourth card ("1000s") has no data-jci-count so it is skipped
   automatically — it keeps its static text.
---------------------------------------------------------------- */
(function initJciCounters() {
  const jciCounterObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;

        const el     = entry.target;
        const target = parseInt(el.dataset.jciCount, 10);
        const suffix = el.dataset.jciSuffix || '';

        if (isNaN(target)) return; // skip the "1000s" card

        const duration = 1400;
        const startTime = performance.now();

        function step(now) {
          var elapsed  = now - startTime;
          var progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        jciCounterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('[data-jci-count]').forEach(function(el) {
    jciCounterObserver.observe(el);
  });
}());


/* ----------------------------------------------------------------
   2. JCI SCROLL REVEAL OBSERVER
   Watches all .jci-reveal elements and adds .jci-revealed when
   they enter the viewport. Separate from the existing revealObserver
   so there is zero interference with your existing code.
---------------------------------------------------------------- */
(function initJciReveal() {
  var jciRevealObserver = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('jci-revealed');
          jciRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.jci-reveal').forEach(function(el) {
    jciRevealObserver.observe(el);
  });
}());

// ======================================
// MOBILE ACCORDION — Success Stories
// Runs only on screens 768px and below
// ======================================
(function initMobileAccordion() {
  if (window.innerWidth > 768) return;

  const accordionBtns = document.querySelectorAll('.ss-accordion-btn');

  // On mobile: show all panels (remove hidden attr), hide content inside them
  document.querySelectorAll('.ss-panel').forEach(function(panel) {
    panel.removeAttribute('hidden');
  });

  accordionBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const panel = btn.closest('.ss-panel');
      const isOpen = panel.classList.contains('accordion-open');

      // Close all
      document.querySelectorAll('.ss-panel').forEach(function(p) {
        p.classList.remove('accordion-open');
        const b = p.querySelector('.ss-accordion-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Open this one if it was closed
      if (!isOpen) {
        panel.classList.add('accordion-open');
        btn.setAttribute('aria-expanded', 'true');
        // Smooth scroll to it
        setTimeout(function() {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });
}());