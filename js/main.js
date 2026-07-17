/* =============================================
   PINTOVET — JavaScript principal
   ============================================= */

const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const backTop  = document.getElementById('backToTop');
const form     = document.getElementById('appointmentForm');
const success  = document.getElementById('formSuccess');
const dateInput = document.getElementById('date');

/* ---- Navbar scroll ---- */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* ---- Burger menu ---- */
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Cerrar menú al hacer click en un enlace */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---- Back to top ---- */
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Fecha mínima en formulario (hoy) ---- */
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

/* ---- Formulario de cita ---- */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const required = form.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#E91E8C';
      valid = false;
    }
  });

  if (!valid) {
    const first = form.querySelector('[required]:placeholder-shown, [required][value=""]');
    (form.querySelector('[required][style*="border-color"]') || required[0]).focus();
    return;
  }

  /* Aquí puedes conectar con un backend, EmailJS, Formspree, etc.
     Por ahora simulamos el envío con un timeout. */
  const btn = form.querySelector('.btn--form');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

  setTimeout(() => {
    form.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Solicitar cita';
    success.classList.add('visible');
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    setTimeout(() => success.classList.remove('visible'), 6000);
  }, 1200);
});

/* ---- Animación de entrada con IntersectionObserver ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .badge, .contact__item, .about__text').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* CSS para las animaciones (inyectado aquí para mantener el JS autónomo) */
const style = document.createElement('style');
style.textContent = `
  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .5s ease, transform .5s ease;
  }
  .fade-up.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
