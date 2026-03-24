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


