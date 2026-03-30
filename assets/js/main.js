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


// Modal Logic
window.openModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.transform').classList.remove('scale-95');
    document.body.style.overflow = 'hidden';
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.transform').classList.add('scale-95');
    document.body.style.overflow = '';
  }
};

window.closeModalOutside = function(event, id) {
  if (event.target.id === id) {
    closeModal(id);
  }
};

// Cierre del modal con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.fixed.z-\\[100\\]:not(.opacity-0)');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Manejo del envío del formulario (AJAX) para Netlify
const contactForms = document.querySelectorAll('form[name="contacto"]');
const lang = document.documentElement.lang || 'es';

contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalBtnText = submitButton.innerHTML;
        
        // Textos segun idioma
        const textSending = lang === 'en' ? 'Sending...' : 'Enviando...';
        const textSuccess = lang === 'en' ? 'Message Sent!' : '¡Mensaje Enviado!';
        const textError = lang === 'en' ? 'Error sending' : 'Error al enviar';

        // Estado inicial (Cargando)
        submitButton.innerHTML = `<span class="material-symbols-outlined animate-spin mr-2">progress_activity</span> ${textSending}`;
        submitButton.disabled = true;
        submitButton.classList.add('opacity-80', 'cursor-not-allowed');

        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            // Estado Final (Éxito)
            submitButton.innerHTML = `<span class="material-symbols-outlined mr-2">check_circle</span> ${textSuccess}`;
            submitButton.classList.replace('bg-primary', 'bg-green-600');
            submitButton.classList.replace('shadow-primary/30', 'shadow-green-600/30');
            submitButton.classList.remove('opacity-80', 'animate-pulse');
            
            // Resetear inputs del form
            form.reset();
            
            // Volver la UI del botón a la normalidad después de 4 segundos
            setTimeout(() => {
                submitButton.innerHTML = originalBtnText;
                submitButton.classList.replace('bg-green-600', 'bg-primary');
                submitButton.classList.replace('shadow-green-600/30', 'shadow-primary/30');
                submitButton.disabled = false;
                submitButton.classList.remove('cursor-not-allowed');
            }, 4000);
        })
        .catch((error) => {
            console.error('Error details:', error);
            // Estado de Error
            submitButton.innerHTML = `<span class="material-symbols-outlined mr-2">error</span> ${textError}`;
            submitButton.classList.replace('bg-primary', 'bg-red-500');
            submitButton.classList.remove('opacity-80');
            
            // Volver la UI a la normalidad después de 4 segundos
            setTimeout(() => {
                submitButton.innerHTML = originalBtnText;
                submitButton.classList.replace('bg-red-500', 'bg-primary');
                submitButton.disabled = false;
                submitButton.classList.remove('cursor-not-allowed');
            }, 4000);
        });
    });
});

// Smooth scrolling cross-browser para todos los enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Manejo especial para el "Back to Top" si su href es solo "#"
        if (targetId === '#') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Desplazamiento suave hasta el elemento
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Opcional: Agregar el hash a la URL sin provocar salto brusco
            history.pushState(null, null, targetId);
        }
    });
});

