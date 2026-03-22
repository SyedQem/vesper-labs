/**
 * Vesper Labs | Main Script
 * Handles: preloader, custom cursor, magnetic effects,
 *          scroll animations, matrix rain, sticky header, active nav
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Preloader
       ========================================================================== */
    const preloader = document.getElementById('preloader');

    if (preloader) {
        // Wait for the fill animation (0.9s) + brief hold, then dismiss
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1100);
    }

    /* ==========================================================================
       Custom Cursor & Magnetic Effects
       ========================================================================== */
    const dot     = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let outlineX = mouseX, outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function renderCursor() {
        dotX     += (mouseX - dotX)     * 0.5;
        dotY     += (mouseY - dotY)     * 0.5;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        dot.style.transform     = `translate(${dotX}px, ${dotY}px)`;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover state on interactive elements
    document.querySelectorAll('a, button, .hover-reveal').forEach((el) => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Magnetic pull
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width  / 2;
            const y = e.clientY - rect.top  - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNavOverlay = document.getElementById('mobile-nav');
    const setMobileNavState = (isOpen) => {
        document.body.classList.toggle('nav-open', isOpen);
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        }
        if (mobileNavOverlay) {
            mobileNavOverlay.setAttribute('aria-hidden', String(!isOpen));
        }
    };

    if (menuBtn && mobileNavOverlay) {
        menuBtn.addEventListener('click', () => {
            const isOpen = !document.body.classList.contains('nav-open');
            setMobileNavState(isOpen);
        });

        // Close menu when clicking a mobile nav link
        mobileNavOverlay.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                setMobileNavState(false);
            });
        });
    }

    /* ==========================================================================
       Sticky Header — adds .scrolled class after 60px
       ========================================================================== */
    const header = document.getElementById('header');

    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load
    }

    /* ==========================================================================
       Active Section Nav Highlight (Intersection Observer)
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    if (navLinks.length) {
        const sectionIds = [...navLinks].map(l => l.dataset.section);
        const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(l => l.classList.remove('section-active'));
                        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
                        if (active) active.classList.add('section-active');
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach(s => sectionObserver.observe(s));
    }

    /* ==========================================================================
       Matrix Rain — Hero Canvas Animation
       ========================================================================== */
    const heroCanvas = document.getElementById('hero-canvas');

    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΑΒΓΔΘΛΞΠΣΦΨΩアイウエオカキクケコサシスセソタチツテトナニヌネノ';
        const FONT_SIZE = 14;
        let columns = [];
        let animFrameId = null;
        let lastFrameTime = 0;
        const FRAME_INTERVAL = 1000 / 20; // 20fps

        function initCanvas() {
            heroCanvas.width  = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
            const numCols = Math.floor(heroCanvas.width / FONT_SIZE);
            columns = Array.from({ length: numCols }, () =>
                Math.floor(Math.random() * (heroCanvas.height / FONT_SIZE))
            );
            ctx.fillStyle = '#030303';
            ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
        }

        function drawFrame(timestamp) {
            animFrameId = requestAnimationFrame(drawFrame);
            const elapsed = timestamp - lastFrameTime;
            if (elapsed < FRAME_INTERVAL) return;
            lastFrameTime = timestamp - (elapsed % FRAME_INTERVAL);

            ctx.fillStyle = 'rgba(3, 3, 3, 0.18)';
            ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);

            ctx.font = `${FONT_SIZE}px 'Space Grotesk', monospace`;

            columns.forEach((y, i) => {
                const char       = CHARS[Math.floor(Math.random() * CHARS.length)];
                const brightness = Math.random() > 0.92 ? '255, 255, 255' : '180, 180, 180';
                ctx.fillStyle    = `rgb(${brightness})`;
                ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);

                if (y * FONT_SIZE > heroCanvas.height && Math.random() > 0.975) {
                    columns[i] = 0;
                } else {
                    columns[i] = y + 1;
                }
            });
        }

        const startRain = () => { if (!animFrameId) animFrameId = requestAnimationFrame(drawFrame); };
        const stopRain  = () => { if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; } };

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            new IntersectionObserver(
                (entries) => entries[0].isIntersecting ? startRain() : stopRain(),
                { threshold: 0.01 }
            ).observe(heroSection);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => { stopRain(); initCanvas(); startRain(); }, 150);
        });

        initCanvas();
        startRain();
    }

    /* ==========================================================================
       Hero Load Animation
       ========================================================================== */
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => heroSection.classList.add('loaded'), 1150); // after preloader
    }

    /* ==========================================================================
       Scroll Reveal (Intersection Observer)
       ========================================================================== */
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-text-scroll').forEach(el => revealObserver.observe(el));

});
