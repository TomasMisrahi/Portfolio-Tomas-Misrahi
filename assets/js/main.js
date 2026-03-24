// Back to top logic
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("translate-y-20", "opacity-0");
    } else {
      backToTopBtn.classList.add("translate-y-20", "opacity-0");
    }
  });
}

// Memorizar posición de scroll al cambiar de idioma
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    sessionStorage.setItem('langScroll', window.scrollY);
  });
}

// Lógica de carga
window.addEventListener('load', () => {
  const scrollPos = sessionStorage.getItem('langScroll');
  if (scrollPos) {
    const html = document.documentElement;
    html.style.scrollBehavior = 'auto'; // Disable smooth scroll briefly
    window.scrollTo(0, parseInt(scrollPos, 10));
    sessionStorage.removeItem('langScroll');
    setTimeout(() => { html.style.scrollBehavior = ''; }, 50);
  }

  // Ocultar Loader
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) {
      loader.classList.add('opacity-0', 'pointer-events-none');
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
  }, 150);
});

// Hero image scroll effect
const heroContainer = document.getElementById("heroImageContainer");
const heroImg = document.getElementById("heroImage");
const heroGlow = document.getElementById("heroGlow");

if (heroContainer && heroImg && heroGlow) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      // Glow
      heroGlow.classList.remove("bg-primary/20");
      heroGlow.classList.add("bg-primary/30");
      // Container
      heroContainer.classList.remove("-rotate-2");
      heroContainer.classList.add("rotate-0");
      // Image
      heroImg.classList.remove("grayscale");
      heroImg.classList.add("grayscale-0");
    } else {
      // Glow
      heroGlow.classList.remove("bg-primary/30");
      heroGlow.classList.add("bg-primary/20");
      // Container
      heroContainer.classList.remove("rotate-0");
      heroContainer.classList.add("-rotate-2");
      // Image
      heroImg.classList.remove("grayscale-0");
      heroImg.classList.add("grayscale");
    }
  });
}
