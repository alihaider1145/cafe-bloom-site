(function() {
  'use strict';

  /* ===== NAV SCROLL EFFECT ===== */
  const nav = document.querySelector('.nav');
  const navStartedLight = nav?.classList.contains('nav--light');

  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
      if (navStartedLight) nav.classList.remove('nav--light');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
      if (navStartedLight) nav.classList.add('nav--light');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ===== MOBILE NAV ===== */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  const overlay = document.querySelector('.nav__overlay');

  const openMobileNav = () => {
    mobileNav?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMobileNav = () => {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  };

  const toggleMobileNav = () => {
    const isOpen = mobileNav?.classList.contains('open');
    isOpen ? closeMobileNav() : openMobileNav();
  };

  hamburger?.addEventListener('click', toggleMobileNav);
  overlay?.addEventListener('click', closeMobileNav);
  document.querySelectorAll('.nav__mobile a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  /* ===== TESTIMONIAL CAROUSEL ===== */
  const track = document.querySelector('.testimonials__track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonials__dot');
  const prevBtn = document.querySelector('.testimonials__btn--prev');
  const nextBtn = document.querySelector('.testimonials__btn--next');

  let currentSlide = 0;
  let autoplayTimer = null;

  const goToSlide = (index) => {
    if (!track || slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  prevBtn?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoplay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); resetAutoplay(); });
  });

  if (slides.length > 0) {
    goToSlide(0);
    startAutoplay();
  }

  /* ===== MENU TAB SWITCHER (menu.html) ===== */
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const tabPanels = document.querySelectorAll('.menu-tab-panel');

  const activateTab = (target) => {
    tabBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => p.classList.remove('active'));
    const matchingBtn = document.querySelector(`.menu-tab-btn[data-tab="${target}"]`);
    const matchingPanel = document.querySelector(`.menu-tab-panel[data-panel="${target}"]`);
    if (matchingBtn) {
      matchingBtn.classList.add('active');
      matchingBtn.setAttribute('aria-selected', 'true');
    }
    if (matchingPanel) matchingPanel.classList.add('active');
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Activate tab from URL hash on load (e.g. menu.html#pizza)
  if (tabBtns.length > 0 && window.location.hash) {
    const hashTarget = window.location.hash.replace('#', '');
    const matchingBtn = document.querySelector(`.menu-tab-btn[data-tab="${hashTarget}"]`);
    if (matchingBtn) activateTab(hashTarget);
  }

  /* ===== ANNOUNCEMENTS FILTER PILLS (events.html) ===== */
  const filterPills = document.querySelectorAll('.events-hero__pill[data-filter]');
  const eventCards = document.querySelectorAll('.event-card');

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.dataset.filter;
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        eventCards.forEach(card => {
          if (filter === 'all' || card.classList.contains(`event-card--${filter}`)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Intersection Observer for scroll-triggered item animations in the Why Us section
  const items = document.querySelectorAll('.why-us__item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, i * 150);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
 
  items.forEach(item => observer.observe(item));

})();