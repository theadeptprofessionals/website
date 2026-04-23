/* ================================================================
   ADEPT PROFESSIONALS — Unified JavaScript
   Handles all interactive features across all three pages
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger Menu Toggle ──
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.textContent = '☰';
      }
    });
  }

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Scroll Reveal Animation ──
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  // ── Typing Effect (configurable) ──
  const typingEl = document.getElementById('typing');
  if (typingEl) {
    const roles = JSON.parse(typingEl.dataset.roles || '["Developer"]');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = roles[roleIndex];
      if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1800);
          return;
        }
        setTimeout(typeEffect, 80);
      } else {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 300);
          return;
        }
        setTimeout(typeEffect, 40);
      }
    }
    typeEffect();
  }

  // ── Typed.js alternative for training page ──
  const typedEl = document.getElementById('typed-text');
  if (typedEl && !document.getElementById('typing')) {
    const strings = JSON.parse(typedEl.dataset.strings || '["Hello"]');
    let strIndex = 0;
    let cIndex = 0;
    let deleting = false;

    function typedEffect() {
      const current = strings[strIndex];
      if (!deleting) {
        typedEl.textContent = current.substring(0, cIndex + 1);
        cIndex++;
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(typedEffect, 1800);
          return;
        }
        setTimeout(typedEffect, 70);
      } else {
        typedEl.textContent = current.substring(0, cIndex - 1);
        cIndex--;
        if (cIndex === 0) {
          deleting = false;
          strIndex = (strIndex + 1) % strings.length;
          setTimeout(typedEffect, 300);
          return;
        }
        setTimeout(typedEffect, 35);
      }
    }
    typedEffect();
  }

  // ── Gallery Modal ──
  const openGallery = document.getElementById('openGallery');
  const galleryModal = document.getElementById('galleryModal');
  const closeGallery = document.getElementById('closeGallery');

  if (openGallery && galleryModal) {
    openGallery.addEventListener('click', (e) => {
      e.preventDefault();
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeGallery && galleryModal) {
    closeGallery.addEventListener('click', () => {
      galleryModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (galleryModal) {
    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Description/Location Modal ──
  const descModal = document.getElementById('descModal');
  const openDescBtn = document.getElementById('openDesc');
  const closeDescBtn = document.getElementById('closeDesc');

  if (openDescBtn && descModal) {
    openDescBtn.addEventListener('click', (e) => {
      e.preventDefault();
      descModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (closeDescBtn && descModal) {
    closeDescBtn.addEventListener('click', () => {
      descModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  if (descModal) {
    descModal.addEventListener('click', (e) => {
      if (e.target === descModal) {
        descModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Auto Year ──
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ── Registration Form (Training page) ──
  const registerForm = document.getElementById('registerForm');
  const formMessage = document.getElementById('formMessage');

  if (registerForm && formMessage) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formMessage.textContent = 'Submitting...';
      formMessage.style.display = 'block';
      formMessage.style.color = 'var(--accent-primary)';

      const formData = new FormData(registerForm);
      try {
        const response = await fetch('https://formspree.io/f/xkgqwnkr', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formMessage.textContent = '✅ Thank you! Redirecting to payment...';
          formMessage.style.color = 'var(--accent-success)';
          setTimeout(() => {
            window.location.href = 'https://paystack.shop/pay/adepttraining';
          }, 2500);
        } else {
          formMessage.textContent = '⚠️ Something went wrong. Please try again.';
          formMessage.style.color = 'var(--accent-warm)';
        }
      } catch (error) {
        formMessage.textContent = '❌ Error submitting form.';
        formMessage.style.color = 'var(--accent-red)';
      }
    });
  }

  // ── Contact Form (Dev page) ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      try {
        const response = await fetch('https://formspree.io/f/meolbygv', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          submitBtn.textContent = '✅ Sent!';
          contactForm.reset();
          setTimeout(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000);
        } else {
          submitBtn.textContent = '❌ Failed';
          setTimeout(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000);
        }
      } catch (err) {
        submitBtn.textContent = '❌ Error';
        setTimeout(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000);
      }
    });
  }

  // ── Counter Animation for Stats ──
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();

          function updateCounter(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(updateCounter);
          }
          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

});
