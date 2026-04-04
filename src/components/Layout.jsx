import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Preloader from './Preloader.jsx';
import CustomCursor from './CustomCursor.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { easeOutExpo } from '../motionConfig.js';

export default function Layout() {
    const reducedMotion = useReducedMotion();
    const location = useLocation();
    const lenisEnabled = !reducedMotion;

    const pageTransition = {
        initial: reducedMotion ? { opacity: 1 } : { opacity: 0 },
        animate: { opacity: 1 },
        exit: reducedMotion ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: reducedMotion ? 0 : 0.35, ease: easeOutExpo },
    };

    const shell = (
        <>
            <Header lenisEnabled={lenisEnabled} />
            <main id="main">
                <AnimatePresence mode="wait">
                    <motion.div key={location.pathname} {...pageTransition}>
                        <Outlet context={{ lenisEnabled }} />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );

    return (
        <>
            <a className="skip-link" href="#main">
                Skip to main content
            </a>
            <Preloader />
            <CustomCursor />
            {lenisEnabled ? (
                <ReactLenis root options={{ autoRaf: true, lerp: 0.09 }}>
                    {shell}
                </ReactLenis>
            ) : (
                shell
            )}
        </>
    );
}
