(() => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  const year = document.getElementById('year');
  const toast = document.getElementById('toast');

  if (year) year.textContent = String(new Date().getFullYear());

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Add a contact email or custom behavior here when a professional email is ready.
  if (toast) {
    const showToast = message => {
      toast.textContent = message;
      toast.classList.add('show');
      window.setTimeout(() => toast.classList.remove('show'), 3200);
    };
    document.querySelectorAll('[data-toast]').forEach(button => {
      button.addEventListener('click', event => {
        event.preventDefault();
        showToast(button.getAttribute('data-toast') || 'Update this item before publishing.');
      });
    });
  }
})();
