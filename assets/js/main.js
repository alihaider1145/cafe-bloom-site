(function() {
  'use strict';

  /* ===== NAV SCROLL EFFECT ===== */
  const nav = document.querySelector('.nav');

  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('nav--solid');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--solid');
      nav.classList.add('nav--transparent');
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
  };

  const closeMobileNav = () => {
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', openMobileNav);
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

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.menu-tab-panel[data-panel="${target}"]`)?.classList.add('active');
    });
  });

})();
