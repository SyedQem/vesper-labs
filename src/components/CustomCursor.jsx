import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
    const dot = useRef(null);
    const outline = useRef(null);
    const location = useLocation();
    const hoverHandlersRef = useRef({ onHoverEnter: null, onHoverLeave: null });
    const unbindHoverRef = useRef(() => {});
    const cursorStateRef = useRef({
        initialized: false,
        hasPointerPosition: false,
        mouseX: 0,
        mouseY: 0,
        dotX: 0,
        dotY: 0,
        outlineX: 0,
        outlineY: 0,
    });

    useEffect(() => {
        const finePointerMediaQuery = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
        let rafId = 0;

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

        const syncCursorPosition = () => {
            const { mouseX, mouseY } = cursorStateRef.current;
            cursorStateRef.current.dotX = mouseX;
            cursorStateRef.current.dotY = mouseY;
            cursorStateRef.current.outlineX = mouseX;
            cursorStateRef.current.outlineY = mouseY;
            if (dot.current) {
                dot.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            }
            if (outline.current) {
                outline.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            }
        };

        const onPointerMove = (e) => {
            if (!finePointerMediaQuery.matches || e.pointerType === 'touch') return;
            const state = cursorStateRef.current;
            state.mouseX = e.clientX;
            state.mouseY = e.clientY;
            if (!state.hasPointerPosition) {
                state.hasPointerPosition = true;
                syncCursorPosition();
            }
            setCursorInactive(false);
        };

        const onMouseLeave = () => {
            setCursorInactive(true);
            document.body.classList.remove('cursor-hover');
        };

        const onMouseEnter = () => {
            if (cursorStateRef.current.hasPointerPosition) {
                setCursorInactive(false);
            }
        };
        const onBlur = () => setCursorInactive(true);
        const onFocus = () => {
            if (cursorStateRef.current.hasPointerPosition) {
                setCursorInactive(false);
            }
        };
        const onVisibility = () => {
            const shouldHide = document.hidden || !cursorStateRef.current.hasPointerPosition;
            setCursorInactive(shouldHide);
            if (document.hidden) document.body.classList.remove('cursor-hover');
        };

        hoverHandlersRef.current = {
            onHoverEnter: () => {
                if (!finePointerMediaQuery.matches) return;
                if (!cursorStateRef.current.hasPointerPosition) return;
                setCursorInactive(false);
                document.body.classList.add('cursor-hover');
            },
            onHoverLeave: () => document.body.classList.remove('cursor-hover'),
        };

        const bindHover = () => {
            const { onHoverEnter, onHoverLeave } = hoverHandlersRef.current;
            const hoverEls = document.querySelectorAll('a, button, .hover-reveal');
            hoverEls.forEach((el) => {
                el.addEventListener('mouseenter', onHoverEnter);
                el.addEventListener('mouseleave', onHoverLeave);
            });
            return () => {
                hoverEls.forEach((el) => {
                    el.removeEventListener('mouseenter', onHoverEnter);
                    el.removeEventListener('mouseleave', onHoverLeave);
                });
            };
        };

        const initializeCustomCursor = () => {
            if (
                cursorStateRef.current.initialized ||
                !dot.current ||
                !outline.current ||
                !syncCustomCursorCapability()
            ) {
                return;
            }

            cursorStateRef.current.initialized = true;
            setCursorInactive(!cursorStateRef.current.hasPointerPosition);

            window.addEventListener('pointermove', onPointerMove);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mouseenter', onMouseEnter);
            window.addEventListener('blur', onBlur);
            window.addEventListener('focus', onFocus);
            document.addEventListener('visibilitychange', onVisibility);

            if (cursorStateRef.current.hasPointerPosition) {
                syncCursorPosition();
            }

            function renderCursor() {
                if (!dot.current || !outline.current) return;
                const state = cursorStateRef.current;
                if (state.hasPointerPosition) {
                    state.dotX += (state.mouseX - state.dotX) * 0.5;
                    state.dotY += (state.mouseY - state.dotY) * 0.5;
                    state.outlineX += (state.mouseX - state.outlineX) * 0.15;
                    state.outlineY += (state.mouseY - state.outlineY) * 0.15;
                    dot.current.style.transform =
                        `translate3d(${state.dotX}px, ${state.dotY}px, 0) translate(-50%, -50%)`;
                    outline.current.style.transform =
                        `translate3d(${state.outlineX}px, ${state.outlineY}px, 0) translate(-50%, -50%)`;
                }
                rafId = requestAnimationFrame(renderCursor);
            }

            renderCursor();
            unbindHoverRef.current = bindHover();
        };

        syncCustomCursorCapability();
        initializeCustomCursor();

        const onFinePointerChange = () => {
            const isEnabled = syncCustomCursorCapability();
            if (isEnabled && !cursorStateRef.current.initialized) {
                initializeCustomCursor();
                return;
            }
            if (!isEnabled) {
                setCursorInactive(true);
            } else {
                setCursorInactive(!cursorStateRef.current.hasPointerPosition);
                if (cursorStateRef.current.hasPointerPosition) {
                    syncCursorPosition();
                }
            }
        };

        if (typeof finePointerMediaQuery.addEventListener === 'function') {
            finePointerMediaQuery.addEventListener('change', onFinePointerChange);
        } else {
            finePointerMediaQuery.addListener(onFinePointerChange);
        }

        return () => {
            cancelAnimationFrame(rafId);
            unbindHoverRef.current();
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
            cursorStateRef.current.initialized = false;
        };
    }, []);

    useEffect(() => {
        if (!cursorStateRef.current.initialized) return;
        unbindHoverRef.current();

        const { onHoverEnter, onHoverLeave } = hoverHandlersRef.current;
        const hoverEls = document.querySelectorAll('a, button, .hover-reveal');
        hoverEls.forEach((el) => {
            el.addEventListener('mouseenter', onHoverEnter);
            el.addEventListener('mouseleave', onHoverLeave);
        });

        unbindHoverRef.current = () => {
            hoverEls.forEach((el) => {
                el.removeEventListener('mouseenter', onHoverEnter);
                el.removeEventListener('mouseleave', onHoverLeave);
            });
        };

        document.body.classList.remove('cursor-hover');

        return () => {
            unbindHoverRef.current();
            unbindHoverRef.current = () => {};
        };
    }, [location.pathname]);

    return (
        <>
            <div className="cursor-dot" ref={dot} aria-hidden="true" />
            <div className="cursor-outline" ref={outline} aria-hidden="true" />
        </>
    );
}
