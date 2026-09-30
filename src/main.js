import './styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearEl = document.querySelector('#year');
const promoButton = document.querySelector('#promo-button');
const promoText = document.querySelector('#promo');
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
const whatsappNumber = '523141228292';

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (promoButton && promoText) {
  promoButton.addEventListener('click', () => {
    promoText.textContent = 'Consulta la promoción vigente y disponibilidad por WhatsApp.';
    const message = encodeURIComponent('Hola, quiero conocer la promoción vigente de Lavadoras Jauregui.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  });
}

const counters = document.querySelectorAll('.counter[data-target]');
const setCounter = (counter, value) => {
  const prefix = counter.dataset.prefix || '';
  const suffix = counter.dataset.suffix || '';
  counter.textContent = `${prefix}${value}${suffix}`;
};

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);
  const duration = 900;
  const start = performance.now();

  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    setCounter(counter, Math.round(target * progress));
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach((counter) => setCounter(counter, counter.dataset.target));
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const message = [
      'Hola, quiero solicitar información de Lavadoras Jauregui.',
      `Nombre: ${formData.get('nombre')}`,
      `Teléfono: ${formData.get('telefono')}`,
      `Necesito: ${formData.get('mensaje')}`,
    ].join('\n');

    if (formNote) formNote.textContent = 'Se abrió WhatsApp con tu solicitud. Revisa el mensaje antes de enviarlo.';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
}
