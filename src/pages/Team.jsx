import { Helmet } from 'react-helmet-async';
import { motion, useReducedMotion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import useHashScroll from '../hooks/useHashScroll.js';
import { fadeUpTransition } from '../motionConfig.js';

const SITE = 'https://vesper-labs.vercel.app';
const ORG_JSON = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Vesper Labs',
    url: `${SITE}/`,
    email: 'hello@vesperlabs.co',
    sameAs: ['https://x.com/VesperLabs_', 'https://www.instagram.com/vesperlabs_'],
};

export default function Team() {
    const { lenisEnabled } = useOutletContext();
    const reducedMotion = useReducedMotion();
    useHashScroll(lenisEnabled);

    const fadeUp = {
        initial: { opacity: 0.2, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: fadeUpTransition(reducedMotion),
    };

    return (
        <>
            <Helmet>
                <title>The Team | Vesper Labs</title>
                <meta
                    name="description"
                    content="Meet the people behind Vesper Labs — engineers, designers, and builders shaping the future of digital experiences."
                />
                <link rel="canonical" href={`${SITE}/team`} />
                <meta property="og:title" content="The Team | Vesper Labs" />
                <meta
                    property="og:description"
                    content="Meet the people behind Vesper Labs — engineers, designers, and builders shaping the future of digital experiences."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${SITE}/team`} />
                <meta property="og:image" content={`${SITE}/og-image.svg`} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Vesper Labs — Engineering Tomorrow" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="The Team | Vesper Labs" />
                <meta
                    name="twitter:description"
                    content="Meet the people behind Vesper Labs — engineers, designers, and builders shaping the future of digital experiences."
                />
                <meta name="twitter:image" content={`${SITE}/og-image.svg`} />
                <script type="application/ld+json">{JSON.stringify(ORG_JSON)}</script>
            </Helmet>

            <section className="team-hero">
                <span className="team-hero-label">03 // The People</span>
                <motion.h1
                    className="team-hero-title"
                    initial={{ opacity: 0.2, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={fadeUpTransition(reducedMotion)}
                >
                    The
                    <br />
                    Team.
                </motion.h1>
            </section>

            <section className="team-section">
                <div className="team-grid-inline">
                    <motion.div className="team-card-inline" {...fadeUp}>
                        <div className="team-card-inline-top">
                            <div className="team-card-avatar-lg">QS</div>
                            <div className="team-card-inline-meta">
                                <h2 className="team-card-inline-name">Qurb E Muhammad Syed</h2>
                                <span className="team-card-inline-role">Founder</span>
                            </div>
                        </div>
                        <div className="team-card-inline-divider" />
                        <p className="team-card-inline-bio">
                            Driven by a conviction that the best digital experiences exist at the
                            intersection of precision engineering and timeless design. Building
                            Vesper Labs to prove it.
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
                                <h2 className="team-card-inline-name">Armando Bazeydio</h2>
                                <span className="team-card-inline-role">Co-Founder</span>
                            </div>
                        </div>
                        <div className="team-card-inline-divider" />
                        <p className="team-card-inline-bio">
                            Shaping the strategic vision at Vesper Labs. Passionate about engineering
                            products that redefine industry standards and building lasting digital
                            ecosystems.
                        </p>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
