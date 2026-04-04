import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CHARS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ΑΒΓΔΘΛΞΠΣΦΨΩアイウエオカキクケコサシスセソタチツテトナニヌネノ';
const FONT_SIZE = 14;
const FRAME_INTERVAL = 1000 / 20;

export default function HeroCanvas({ heroRef }) {
    const canvasRef = useRef(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const heroCanvas = canvasRef.current;
        const heroSection = heroRef?.current;
        if (!heroCanvas || !heroSection || reducedMotion) return;

        const ctx = heroCanvas.getContext('2d');
        let columns = [];
        let animFrameId = null;
        let lastFrameTime = 0;

        function initCanvas() {
            heroCanvas.width = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
            const numCols = Math.max(1, Math.floor(heroCanvas.width / FONT_SIZE));
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
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const brightness = Math.random() > 0.92 ? '255, 255, 255' : '180, 180, 180';
                ctx.fillStyle = `rgb(${brightness})`;
                ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);
                if (y * FONT_SIZE > heroCanvas.height && Math.random() > 0.975) {
                    columns[i] = 0;
                } else {
                    columns[i] = y + 1;
                }
            });
        }

        const startRain = () => {
            if (!animFrameId) animFrameId = requestAnimationFrame(drawFrame);
        };
        const stopRain = () => {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
        };

        initCanvas();

        const io = new IntersectionObserver(
            (entries) => (entries[0].isIntersecting ? startRain() : stopRain()),
            { threshold: 0.01 }
        );
        io.observe(heroSection);

        let resizeTimer;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                stopRain();
                initCanvas();
                startRain();
            }, 150);
        });
        ro.observe(heroSection);

        startRain();

        return () => {
            stopRain();
            io.disconnect();
            ro.disconnect();
            clearTimeout(resizeTimer);
        };
    }, [heroRef, reducedMotion]);

    useEffect(() => {
        const heroCanvas = canvasRef.current;
        const heroSection = heroRef?.current;
        if (!heroCanvas || !heroSection || !reducedMotion) return;
        const ctx = heroCanvas.getContext('2d');
        const paint = () => {
            heroCanvas.width = heroCanvas.offsetWidth;
            heroCanvas.height = heroCanvas.offsetHeight;
            ctx.fillStyle = '#030303';
            ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
        };
        paint();
        const ro = new ResizeObserver(paint);
        ro.observe(heroSection);
        return () => ro.disconnect();
    }, [heroRef, reducedMotion]);

    return <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />;
}
