import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const OFFSET = 100;

/**
 * Scrolls to `location.hash` after navigation (e.g. from /team to /#about).
 */
export default function useHashScroll(lenisAvailable) {
    const location = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        if (!location.hash) return;
        const id = location.hash.slice(1);
        const el = document.getElementById(id);
        if (!el) return;

        const run = () => {
            if (lenisAvailable && lenis) {
                lenis.scrollTo(el, { offset: -OFFSET });
            } else {
                const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
                window.scrollTo({ top, behavior: 'auto' });
            }
        };

        let raf2;
        const raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(run);
        });
        return () => {
            cancelAnimationFrame(raf1);
            if (raf2) cancelAnimationFrame(raf2);
        };
    }, [location.pathname, location.hash, lenis, lenisAvailable]);
}
