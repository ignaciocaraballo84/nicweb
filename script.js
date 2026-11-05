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

  const revealItems = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.88;

    revealItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerBottom) {
        item.classList.add('visible');
      }
    });
  };

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

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
});
