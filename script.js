document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal, .service-card');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card, index) => {
    card.classList.add('reveal-item');
    card.style.setProperty('--reveal-delay', `${index * 120}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const contactForms = document.querySelectorAll('.contact-form');
  contactForms.forEach((contactForm) => {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const whatsappNumber = contactForm.dataset.whatsapp;
      const formData = new FormData(contactForm);
      const message = [
        'Hola NicWeb, quiero hacer una consulta.',
        '',
        `Nombre: ${formData.get('nombre')}`,
        `Email: ${formData.get('email')}`,
        `Mensaje: ${formData.get('mensaje')}`,
      ].join('\n');
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (!whatsappNumber) {
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Abriendo WhatsApp...';
      }

      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');

      window.setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Enviar por WhatsApp';
        }
      }, 1200);
    });
  });
});
