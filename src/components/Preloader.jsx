import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function Preloader() {
    const [hidden, setHidden] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) {
            setHidden(true);
            return;
        }
        const t = setTimeout(() => setHidden(true), 1100);
        return () => clearTimeout(t);
    }, [reducedMotion]);

    return (
        <div className={`preloader${hidden ? ' hidden' : ''}`} id="preloader" aria-hidden={hidden}>
            <span className="preloader-logo">vspr.</span>
            <div className="preloader-bar">
                <div className="preloader-fill" />
            </div>
        </div>
    );
}
