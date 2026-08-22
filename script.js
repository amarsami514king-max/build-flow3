const revealItems = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('[data-target]');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    statNumbers.forEach((number) => {
      const target = Number(number.dataset.target);
      const start = performance.now();
      const duration = 1300;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.disconnect();
  });
}, { threshold: 0.35 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);
