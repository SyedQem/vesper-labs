/**
 * Vesper Labs | Main Script
 * Handles custom cursor, magnetic effects, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       Custom Cursor & Magnetic Effects
       ========================================================================== */
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let outlineX = mouseX;
    let outlineY = mouseY;

    // Listen to mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate Cursor
    function renderCursor() {
        // Dot follows instantly but with slight easing
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        
        // Outline lags behind (easing)
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
        outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover state on links, buttons
    const hoverElements = document.querySelectorAll('a, button, .hover-reveal');
    hoverElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });

    // Magnetic Elements
    const magnetics = document.querySelectorAll('.magnetic');
    
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Adjust pulling intensity
            const intensity = 0.3;
            btn.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    /* ==========================================================================
       Hero Initialization Animation
       ========================================================================== */
    setTimeout(() => {
        document.querySelector('.hero').classList.add('loaded');
    }, 100); // Trigger instantly after load but enough for browser to parse

    /* ==========================================================================
       Intersection Observer for Scroll Reveals
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-text-scroll');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-revealed');
                // Optional: Unobserve after revealing to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});
