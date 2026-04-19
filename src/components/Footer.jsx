import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { fadeUpTransition } from '../motionConfig.js';

export default function Footer() {
    const reducedMotion = useReducedMotion();

    return (
        <footer className="footer" id="contact">
            <div className="container">
                <div className="footer-top">
                    <motion.h2
                        className="footer-cta"
                        initial={{ opacity: 0.2, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={fadeUpTransition(reducedMotion)}
                    >
                        Have an idea?
                        <br />
                        <a href="mailto:hello@vesperlabs.co" className="contact-link magnetic">
                            <span className="magnetic-inner">Start a project.</span>
                        </a>
                    </motion.h2>
                </div>
                <div className="footer-bottom">
                    <div className="footer-brand">
                        <span className="logo">Vesper Labs &copy; 2026</span>
                    </div>
                    <div className="footer-availability">
                        <span className="availability-dot" />
                        <span className="availability-text">Available for projects</span>
                    </div>
                    <div className="footer-socials">
                        <a
                            href="https://x.com/VesperWorks_"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link magnetic"
                        >
                            <span className="magnetic-inner">Twitter</span>
                        </a>
                        <a
                            href="https://www.instagram.com/vesperworks_?igsh=cm9wMTluOG96ZmV1"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link magnetic"
                        >
                            <span className="magnetic-inner">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
