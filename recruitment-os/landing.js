/* ========================================
   RECRUITMENT OS — PREMIUM LANDING PAGE JS
   ======================================== */

(function () {
    'use strict';

    // ---- Header scroll effect ----
    var header = document.getElementById('siteHeader');
    var lastScroll = 0;

    function handleScroll() {
        var scrollY = window.scrollY;

        // Header background
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            var offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });

    // ---- FAQ Accordion ----
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = this.closest('.faq-item');
            var isOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
                openItem.classList.remove('open');
                openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ---- Scroll-triggered fade-in animations ----
    var animatableSelectors = [
        '.pain-card',
        '.system-card',
        '.trust-card',
        '.differentiator-bar',
        '.step-card',
        '.metric-block',
        '.metric-divider-v',
        '.ba-card',
        '.screenshot-sm',
        '.cta-content',
        '.cta-cal',
        '.faq-list',
        '.apply-header',
        '.apply-qualifiers',
        '.cal-wrapper',
        '.apply-note',
        '.proof-bar',
        '.hero-visual',
    ];

    var animatables = document.querySelectorAll(animatableSelectors.join(', '));
    animatables.forEach(function (el) {
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
    });

    // Section-level animations
    document.querySelectorAll('.section > .container > .eyebrow, .section > .container > .section-headline, .section > .container > .section-sub').forEach(function (el) {
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
    });

    // Stagger grids
    document.querySelectorAll('.pain-grid, .systems-grid, .trust-grid, .metrics-row, .steps-row, .before-after-grid, .proof-screenshots').forEach(function (grid) {
        grid.classList.add('stagger-children');
    });

    // Hero elements appear immediately on load (no scroll trigger needed)
    setTimeout(function () {
        document.querySelectorAll('.hero .fade-in').forEach(function (el, i) {
            setTimeout(function () {
                el.classList.add('visible');
            }, i * 100);
        });
    }, 100);

    // Intersection Observer for scroll animations
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(function (el) {
        // Skip hero elements (handled by timeout above)
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });

    // ---- Number count-up animation ----
    function animateCountUp(el, target, suffix, duration) {
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(start + (target - start) * eased);

            if (target >= 1000) {
                el.textContent = current.toLocaleString() + suffix;
            } else {
                el.textContent = current + suffix;
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    var metricElements = document.querySelectorAll('[data-count]');
    var metricObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var raw = el.textContent.trim();
                var countTarget = parseInt(el.getAttribute('data-count'), 10);
                var suffix = '';

                if (raw.includes('+')) suffix = '+';
                if (raw.includes('x')) suffix = 'x';
                if (raw.includes('%')) suffix = '%';

                animateCountUp(el, countTarget, suffix, 2000);
                metricObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.3
    });

    metricElements.forEach(function (el) {
        metricObserver.observe(el);
    });

    // ---- Parallax-lite for background orbs ----
    var orb1 = document.querySelector('.bg-orb-1');
    var orb2 = document.querySelector('.bg-orb-2');

    if (orb1 && orb2 && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            var y = window.scrollY;
            orb1.style.transform = 'translate(' + (Math.sin(y * 0.001) * 20) + 'px, ' + (y * 0.03) + 'px)';
            orb2.style.transform = 'translate(' + (Math.cos(y * 0.001) * 15) + 'px, ' + (y * -0.02) + 'px)';
        }, { passive: true });
    }

    // ---- Mouse follow subtle glow on hero ----
    var heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth > 1024) {
        heroSection.addEventListener('mousemove', function (e) {
            var rect = heroSection.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            heroSection.style.background = 'radial-gradient(ellipse at ' + x + '% ' + y + '%, rgba(218,119,86,0.03) 0%, transparent 50%)';
        });

        heroSection.addEventListener('mouseleave', function () {
            heroSection.style.background = '';
        });
    }

})();
