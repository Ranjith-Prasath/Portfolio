/* ═══════════════════════════════════════════════════════════════
   Ranjith Prasath M V — Portfolio
   main.js — Navigation, scroll reveal, active section highlighting
   ═══════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Mobile hamburger toggle ───────────────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    /* ── Navbar background on scroll ──────────────────────────── */
    const navbar = document.getElementById('navbar');

    function updateNavBg() {
        if (window.scrollY > 30) {
            navbar.style.background = 'rgba(10, 14, 20, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 14, 20, 0.85)';
        }
    }

    updateNavBg();
    window.addEventListener('scroll', updateNavBg, { passive: true });

    /* ── Active section highlighting via IntersectionObserver ─── */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    const observerOptions = {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(function (section) {
        sectionObserver.observe(section);
    });

    /* ── Scroll reveal animation via IntersectionObserver ─────── */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ── Contact form enhancement ─────────────────────────────── */
    var form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function () {
            var btn = form.querySelector('.form-submit');
            if (btn) {
                btn.textContent = 'Sending...';
                btn.disabled = true;
            }
        });
    }

})();