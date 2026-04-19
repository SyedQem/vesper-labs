import { useCallback, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import HeroCanvas from '../components/HeroCanvas.jsx';
import useHashScroll from '../hooks/useHashScroll.js';
import { easeOutExpo, fadeUpTransition } from '../motionConfig.js';

const SITE = 'https://vesper-labs.vercel.app';
const HOME_META_DESCRIPTION =
    'Vesper Labs — premium digital studio for engineering and design. Darwin is a peer marketplace for university students across Canada to buy, sell, and barter.';
const ORG_JSON = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vesper Labs',
    url: `${SITE}/`,
    email: 'hello@vesperlabs.co',
    sameAs: ['https://x.com/VesperLabs_', 'https://www.instagram.com/vesperlabs_'],
};

const heroLineTransition = (reducedMotion, delay) => ({
    duration: reducedMotion ? 0 : 1,
    delay: reducedMotion ? 0 : delay,
    ease: easeOutExpo,
});

export default function Home() {
    const { lenisEnabled } = useOutletContext();
    const reducedMotion = useReducedMotion();
    const lenis = useLenis();
    const heroRef = useRef(null);
    const [heroReady, setHeroReady] = useState(false);

    useHashScroll(lenisEnabled);

    useEffect(() => {
        const delay = reducedMotion ? 0 : 1100;
        const t = setTimeout(() => setHeroReady(true), delay);
        return () => clearTimeout(t);
    }, [reducedMotion]);

    const scrollToHash = useCallback(
        (e, hash) => {
            e.preventDefault();
            const el = document.querySelector(hash);
            if (!el) return;
            if (lenis) {
                lenis.scrollTo(el, { offset: -100 });
            } else {
                const top = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top, behavior: 'auto' });
            }
        },
        [lenis]
    );

    const fadeUp = {
        initial: { opacity: 0.2, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: fadeUpTransition(reducedMotion),
    };

    const rowContainer = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: reducedMotion ? 0 : 0.12,
                delayChildren: reducedMotion ? 0 : 0.05,
            },
        },
    };

    const rowItem = {
        hidden: { opacity: 0.2, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: fadeUpTransition(reducedMotion),
        },
    };

    return (
        <>
            <Helmet>
                <title>Vesper Labs | Engineering Tomorrow</title>
                <meta name="description" content={HOME_META_DESCRIPTION} />
                <link rel="canonical" href={`${SITE}/`} />
                <meta property="og:title" content="Vesper Labs | Engineering Tomorrow" />
                <meta property="og:description" content={HOME_META_DESCRIPTION} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${SITE}/`} />
                <meta property="og:image" content={`${SITE}/og-image.svg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Vesper Labs — Engineering Tomorrow" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Vesper Labs | Engineering Tomorrow" />
                <meta name="twitter:description" content={HOME_META_DESCRIPTION} />
                <meta name="twitter:image" content={`${SITE}/og-image.svg`} />
                <script type="application/ld+json">{JSON.stringify(ORG_JSON)}</script>
            </Helmet>

            <section className="hero section" id="home" ref={heroRef}>
                <HeroCanvas heroRef={heroRef} />
                <div className="hero-content">
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={heroLineTransition(reducedMotion, 0.1)}
                    >
                        Shaping the future
                    </motion.p>
                    <h1 className="hero-title">
                        {['Pioneering', 'Digital', 'Horizons.'].map((text, i) => (
                            <span key={text} className="line-wrap">
                                <motion.span
                                    className="line reveal-text"
                                    initial={{ y: '110%' }}
                                    animate={heroReady ? { y: 0 } : { y: '110%' }}
                                    transition={heroLineTransition(reducedMotion, 0.12 + i * 0.1)}
                                    style={{ display: 'block', willChange: 'transform' }}
                                >
                                    {text}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={heroLineTransition(reducedMotion, 0.5)}
                    >
                        <p className="hero-description">
                            We are an advanced digital lab crafting premium experiences through
                            engineering, design, and continuous innovation.
                        </p>
                        <a
                            href="#projects"
                            className="btn primary magnetic"
                            onClick={(e) => scrollToHash(e, '#projects')}
                        >
                            <span className="magnetic-inner">Explore Work</span>
                        </a>
                    </motion.div>
                </div>
                <motion.div
                    className="hero-scroll-indicator"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={heroLineTransition(reducedMotion, 0.7)}
                >
                    <span className="scroll-text">Scroll</span>
                    <div className="scroll-line" />
                </motion.div>
            </section>

            <section className="about section" id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-label">
                            <span className="label-text">01 // The Vision</span>
                        </div>
                        <div className="about-text">
                            <motion.h2 className="large-text" {...fadeUp}>
                                We exist to build the unseen. Breaking traditional paradigms to
                                deliver precision, performance, and purely aesthetic digital
                                ecosystems.
                            </motion.h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="expertise section" id="expertise">
                <div className="container">
                    <div className="section-header">
                        <span className="label-text">02 // Expertise</span>
                        <motion.h2 className="section-title" {...fadeUp}>
                            Our Capabilities
                        </motion.h2>
                    </div>

                    <motion.div
                        className="expertise-list"
                        variants={rowContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        {[
                            {
                                title: 'Digital Engineering',
                                desc: 'Building robust, scalable architectures for the modern web.',
                            },
                            {
                                title: 'Immersive Design',
                                desc: 'Crafting pixel-perfect, motion-rich user interfaces.',
                            },
                            {
                                title: 'Creative Development',
                                desc: 'Bridging the gap between creative vision and technical reality using WebGL and advanced CSS.',
                            },
                            {
                                title: 'Brand Identity',
                                desc: 'Forging distinct, timeless digital identities for forward-thinking companies.',
                            },
                        ].map(({ title, desc }) => (
                            <motion.div
                                key={title}
                                className="expertise-item hover-reveal"
                                variants={rowItem}
                            >
                                <h3 className="expertise-name">{title}</h3>
                                <p className="expertise-desc">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="projects section" id="projects">
                <div className="container">
                    <div className="section-header">
                        <span className="label-text">03 // Projects</span>
                        <motion.h2 className="section-title" {...fadeUp}>
                            Selected work
                        </motion.h2>
                    </div>

                    <motion.div
                        className="expertise-list"
                        variants={rowContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                    >
                        <motion.div
                            className="expertise-item hover-reveal"
                            variants={rowItem}
                        >
                            <h3 className="expertise-name">Darwin</h3>
                            <div className="project-detail">
                                <p className="expertise-desc">
                                    Peer marketplace for university students across Canada — buy, sell,
                                    and barter with a focused, trustworthy experience.
                                </p>
                                <a
                                    href="https://darwinmarket.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn secondary magnetic project-cta"
                                >
                                    <span className="magnetic-inner">Visit Darwin &rarr;</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                    <p className="expertise-desc projects-footnote">
                        More projects in development.
                    </p>
                </div>
            </section>

            <section className="team-inline section" id="team">
                <div className="container">
                    <div className="section-header">
                        <span className="label-text">04 // The People</span>
                        <motion.h2 className="section-title" {...fadeUp}>
                            The Team
                        </motion.h2>
                    </div>
                    <div className="team-grid-inline">
                        <motion.div
                            className="team-card-inline"
                            initial={{ opacity: 0.2, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={fadeUpTransition(reducedMotion)}
                        >
                            <div className="team-card-inline-top">
                                <div className="team-card-avatar-lg">QS</div>
                                <div className="team-card-inline-meta">
                                    <h3 className="team-card-inline-name">Qurb E Muhammad Syed</h3>
                                    <span className="team-card-inline-role">Founder</span>
                                </div>
                            </div>
                            <div className="team-card-inline-divider" />
                            <p className="team-card-inline-bio">
                                Driven by a conviction that the best digital experiences exist at the
                                intersection of precision engineering and timeless design. Building
                                Vesper Works to prove it.
                            </p>
                        </motion.div>
                        <motion.div
                            className="team-card-inline"
                            initial={{ opacity: 0.2, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                ...fadeUpTransition(reducedMotion),
                                delay: reducedMotion ? 0 : 0.08,
                            }}
                        >
                            <div className="team-card-inline-top">
                                <div className="team-card-avatar-lg">AB</div>
                                <div className="team-card-inline-meta">
                                    <h3 className="team-card-inline-name">Armando Bazeydio</h3>
                                    <span className="team-card-inline-role">Co-Founder</span>
                                </div>
                            </div>
                            <div className="team-card-inline-divider" />
                            <p className="team-card-inline-bio">
                                Shaping the strategic vision at Vesper Works. Passionate about
                                engineering products that redefine industry standards and building
                                lasting digital ecosystems.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="marquee section">
                <div className="marquee-inner">
                    <span className="marquee-text">
                        Vesper Labs &mdash; Engineering Tomorrow &mdash; Vesper Labs &mdash;
                        Engineering Tomorrow &mdash; Vesper Labs &mdash; Engineering Tomorrow &mdash;{' '}
                    </span>
                </div>
            </section>
        </>
    );
}
