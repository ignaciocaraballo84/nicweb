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

  const revealItems = document.querySelectorAll(
    '.reveal, .service-card, .detail-card, .about-grid > *, .contact-grid > *'
  );
  const staggeredGroups = document.querySelectorAll(
    '.cards-grid, .about-grid, .contact-grid'
  );

  staggeredGroups.forEach((group) => {
    group.querySelectorAll(':scope > *').forEach((item, index) => {
      item.classList.add('reveal-item');
      item.style.setProperty('--reveal-delay', `${index * 120}ms`);
    });
  });

  document.querySelectorAll('.detail-card').forEach((item) => {
    item.classList.add('reveal-item');
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

  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    let activeIndex = 0;
    let autoplay;

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
        slide.tabIndex = isActive ? 0 : -1;
      });

      dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeIndex;
        dot.classList.toggle('active', isActive);
        if (isActive) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    };

    const stopAutoplay = () => window.clearInterval(autoplay);
    const startAutoplay = () => {
      stopAutoplay();
      if (
        !carousel.matches(':hover') &&
        !carousel.contains(document.activeElement)
      ) {
        autoplay = window.setInterval(() => {
          if (!document.hidden) {
            showSlide(activeIndex + 1);
          }
        }, 2000);
      }
    };

    carousel.querySelector('.carousel-prev').addEventListener('click', () => {
      showSlide(activeIndex - 1);
      startAutoplay();
    });

    carousel.querySelector('.carousel-next').addEventListener('click', () => {
      showSlide(activeIndex + 1);
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoplay();
      });
    });

    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });
    startAutoplay();
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
