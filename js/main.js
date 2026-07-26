/* ═══════════════════════════════════════════════════════════════
   Ranjith Prasath M V — Portfolio
   main.js — Typing, counters, nav, scroll reveal, gallery, lightbox
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
            navbar.style.background = 'rgba(248, 249, 251, 0.97)';
            navbar.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.04)';
        } else {
            navbar.style.background = 'rgba(248, 249, 251, 0.85)';
            navbar.style.boxShadow = 'none';
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

    /* ── Typing animation in hero ────────────────────────────── */
    var typedEl = document.querySelector('.typed-text');
    var linesEl = document.querySelector('.hero-typed-lines');
    var ctaEl = document.querySelector('.hero-cta');
    var linksEl = document.querySelector('.hero-links');

    if (typedEl && linesEl) {
        var parts = [
            { text: "Master's student in Data Science at UCLouvain", highlight: false },
            { text: " — focused on ", highlight: false },
            { text: "financial risk", highlight: true },
            { text: ", ", highlight: false },
            { text: "regulatory reporting", highlight: true },
            { text: ", and ", highlight: false },
            { text: "reconciliation analytics", highlight: true }
        ];

        var charIndex = 0;
        var partIndex = 0;
        var typedHTML = '';
        var typeSpeed = 28;
        var startDelay = 400;

        function typeNext() {
            if (partIndex >= parts.length) {
                if (ctaEl) ctaEl.classList.add('visible');
                if (linksEl) linksEl.classList.add('visible');
                return;
            }

            var part = parts[partIndex];
            if (charIndex < part.text.length) {
                var char = part.text[charIndex];
                if (part.highlight) {
                    if (charIndex === 0) {
                        typedHTML += '<span class="accent">';
                    }
                    typedHTML += char;
                    if (charIndex === part.text.length - 1) {
                        typedHTML += '</span>';
                    }
                } else {
                    typedHTML += char;
                }
                typedEl.innerHTML = typedHTML;
                charIndex++;
                setTimeout(typeNext, typeSpeed);
            } else {
                partIndex++;
                charIndex = 0;
                setTimeout(typeNext, typeSpeed / 2);
            }
        }

        setTimeout(typeNext, startDelay);
    }

    /* ── Animated counters ────────────────────────────────────── */
    var counters = document.querySelectorAll('[data-count]');

    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-count'), 10);
                var suffix = el.getAttribute('data-suffix') || '';
                var duration = 1600;
                var startTime = null;

                function animate(currentTime) {
                    if (!startTime) startTime = currentTime;
                    var progress = Math.min((currentTime - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var value = Math.round(eased * target);
                    el.textContent = value + suffix;
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = target + suffix;
                    }
                }

                requestAnimationFrame(animate);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
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

    /* ══════════════════════════════════════════════════════════
       GALLERY — Drag-to-scroll + auto-scroll
       ══════════════════════════════════════════════════════════ */

    var scrollContainers = document.querySelectorAll('.project-scroll');

    scrollContainers.forEach(function (container) {
        var isDown = false;
        var startX = 0;
        var scrollLeft = 0;
        var dragMoved = false;

        container.addEventListener('mousedown', function (e) {
            isDown = true;
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            dragMoved = false;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - container.offsetLeft;
            var walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 3) dragMoved = true;
            container.scrollLeft = scrollLeft - walk;
        });

        container.addEventListener('mouseup', function () {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseleave', function () {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('click', function (e) {
            if (dragMoved) {
                e.stopPropagation();
            }
        });

        // Auto-scroll: drift 20px/s, pause on hover
        var autoScrollInterval = null;
        var scrollSpeed = 0.35;

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(function () {
                if (container.matches(':hover')) return;
                var maxScroll = container.scrollWidth - container.clientWidth;
                if (maxScroll <= 0) return;
                var next = container.scrollLeft + scrollSpeed;
                if (next >= maxScroll) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft = next;
                }
            }, 16);
        }

        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }

        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);

        startAutoScroll();
    });

    /* ══════════════════════════════════════════════════════════
       LIGHTBOX
       ══════════════════════════════════════════════════════════ */

    var lightbox = document.getElementById('lightbox');
    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var lightboxCaption = lightbox.querySelector('.lightbox-caption');
    var lightboxClose = lightbox.querySelector('.lightbox-close');
    var lightboxPrev = lightbox.querySelector('.lightbox-prev');
    var lightboxNext = lightbox.querySelector('.lightbox-next');
    var lightboxBackdrop = lightbox.querySelector('.lightbox-backdrop');

    var currentImages = [];
    var currentIndex = 0;

    function openLightbox(images, index) {
        currentImages = images;
        currentIndex = index;
        showLightboxImage();
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function showLightboxImage() {
        var img = currentImages[currentIndex];
        lightboxImg.src = img.full;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = img.caption || img.alt || '';
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function prevImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage();
        }
    }

    function nextImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showLightboxImage();
        }
    }

    // Click any gallery image to open lightbox
    document.addEventListener('click', function (e) {
        var img = e.target.closest('.project-scroll img');
        if (!img) return;

        var container = img.closest('.project-scroll');
        var images = [];
        container.querySelectorAll('img').forEach(function (el, idx) {
            images.push({
                full: el.getAttribute('data-full') || el.src,
                alt: el.alt,
                caption: el.alt
            });
        });
        var index = Array.from(container.querySelectorAll('img')).indexOf(img);
        openLightbox(images, index);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBackdrop.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

})();