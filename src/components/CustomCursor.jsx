import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
    const dot = useRef(null);
    const outline = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const finePointerMediaQuery = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        let cursorInitialized = false;
        let rafId = 0;
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let outlineX = mouseX;
        let outlineY = mouseY;

        const syncCustomCursorCapability = () => {
            const isEnabled = finePointerMediaQuery.matches;
            document.body.classList.toggle('custom-cursor-enabled', isEnabled);
            if (!isEnabled) {
                document.body.classList.remove('cursor-hover', 'cursor-inactive');
            }
            return isEnabled;
        };

        const setCursorInactive = (isInactive) => {
            document.body.classList.toggle('cursor-inactive', isInactive);
        };

        const onPointerMove = (e) => {
            if (!finePointerMediaQuery.matches || e.pointerType === 'touch') return;
            mouseX = e.clientX;
            mouseY = e.clientY;
            setCursorInactive(false);
        };

        const onMouseLeave = () => {
            setCursorInactive(true);
            document.body.classList.remove('cursor-hover');
        };

        const onMouseEnter = () => setCursorInactive(false);
        const onBlur = () => setCursorInactive(true);
        const onFocus = () => setCursorInactive(false);
        const onVisibility = () => {
            setCursorInactive(document.hidden);
            if (document.hidden) document.body.classList.remove('cursor-hover');
        };

        const hoverEls = () => document.querySelectorAll('a, button, .hover-reveal');
        const onHoverEnter = () => {
            if (!finePointerMediaQuery.matches) return;
            setCursorInactive(false);
            document.body.classList.add('cursor-hover');
        };
        const onHoverLeave = () => document.body.classList.remove('cursor-hover');

        const bindHover = () => {
            hoverEls().forEach((el) => {
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
        };

        const unbindHover = () => {
            hoverEls().forEach((el) => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
            });
        };

        const initializeCustomCursor = () => {
            if (cursorInitialized || !dot.current || !outline.current || !syncCustomCursorCapability()) {
                return;
            }
            cursorInitialized = true;

            window.addEventListener('pointermove', onPointerMove);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mouseenter', onMouseEnter);
            window.addEventListener('blur', onBlur);
            window.addEventListener('focus', onFocus);
            document.addEventListener('visibilitychange', onVisibility);

            function renderCursor() {
                if (!dot.current || !outline.current) return;
                dotX += (mouseX - dotX) * 0.5;
                dotY += (mouseY - dotY) * 0.5;
                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;
                dot.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
                outline.current.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
                rafId = requestAnimationFrame(renderCursor);
            }
            renderCursor();
            bindHover();
        };

        syncCustomCursorCapability();
        initializeCustomCursor();

        const onFinePointerChange = () => {
            syncCustomCursorCapability();
            if (finePointerMediaQuery.matches && !cursorInitialized) {
                initializeCustomCursor();
            }
        };
        if (typeof finePointerMediaQuery.addEventListener === 'function') {
            finePointerMediaQuery.addEventListener('change', onFinePointerChange);
        } else {
            finePointerMediaQuery.addListener(onFinePointerChange);
        }

        return () => {
            cancelAnimationFrame(rafId);
            unbindHover();
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('blur', onBlur);
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVisibility);
            if (typeof finePointerMediaQuery.removeEventListener === 'function') {
                finePointerMediaQuery.removeEventListener('change', onFinePointerChange);
            } else {
                finePointerMediaQuery.removeListener(onFinePointerChange);
            }
            document.body.classList.remove('custom-cursor-enabled', 'cursor-hover', 'cursor-inactive');
        };
    }, [location.pathname]);

    return (
        <>
            <div className="cursor-dot" ref={dot} aria-hidden="true" />
            <div className="cursor-outline" ref={outline} aria-hidden="true" />
        </>
    );
}
