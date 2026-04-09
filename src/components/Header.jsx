import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from 'lenis/react';

const HEADER_OFFSET = 100;

export default function Header({ lenisEnabled }) {
    const headerRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const lenis = useLenis();
    const [navOpen, setNavOpen] = useState(false);
    const isHome = location.pathname === '/';
    const isBlogRoute = location.pathname.startsWith('/blog');

    const scrollToSelector = useCallback(
        (hash) => {
            const el = document.querySelector(hash);
            if (!el) return;
            if (lenis) {
                lenis.scrollTo(el, { offset: -HEADER_OFFSET });
            } else {
                const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                window.scrollTo({ top, behavior: 'auto' });
            }
        },
        [lenis]
    );

    const goHomeSection = useCallback(
        (e, hash) => {
            e.preventDefault();
            setNavOpen(false);
            if (isHome) {
                scrollToSelector(hash);
            } else {
                const id = hash.slice(1);
                navigate(id ? `/#${id}` : '/');
            }
        },
        [isHome, navigate, scrollToSelector]
    );

    const onLenisScroll = useCallback(
        (l) => {
            if (!headerRef.current || !lenisEnabled) return;
            headerRef.current.classList.toggle('scrolled', l.scroll > 60);
        },
        [lenisEnabled]
    );

    useLenis(onLenisScroll, [lenisEnabled]);

    useEffect(() => {
        if (lenisEnabled) return;
        const headerEl = headerRef.current;
        if (!headerEl) return;
        const onScroll = () => headerEl.classList.toggle('scrolled', window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [lenisEnabled]);

    useEffect(() => {
        const resetMagnetic = () => {
            document.querySelectorAll('.magnetic').forEach((el) => {
                el.style.setProperty('--magnetic-x', '0px');
                el.style.setProperty('--magnetic-y', '0px');
            });
        };
        const onScrollOrBlur = () => resetMagnetic();
        window.addEventListener('scroll', onScrollOrBlur, { passive: true });
        window.addEventListener('blur', onScrollOrBlur);
        return () => {
            window.removeEventListener('scroll', onScrollOrBlur);
            window.removeEventListener('blur', onScrollOrBlur);
        };
    }, []);

    useEffect(() => {
        const magneticElements = document.querySelectorAll('.magnetic');
        const resetMagneticOffset = (element) => {
            element.style.setProperty('--magnetic-x', '0px');
            element.style.setProperty('--magnetic-y', '0px');
        };
        const handlers = [];
        magneticElements.forEach((element) => {
            const inner = element.querySelector('.magnetic-inner');
            if (!inner) return;
            const onMove = (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                element.style.setProperty('--magnetic-x', `${x * 0.3}px`);
                element.style.setProperty('--magnetic-y', `${y * 0.3}px`);
            };
            const reset = () => resetMagneticOffset(element);
            element.addEventListener('mousemove', onMove);
            ['mouseleave', 'pointercancel', 'blur'].forEach((ev) => element.addEventListener(ev, reset));
            handlers.push({ element, onMove, reset });
        });
        return () => {
            handlers.forEach(({ element, onMove, reset }) => {
                element.removeEventListener('mousemove', onMove);
                ['mouseleave', 'pointercancel', 'blur'].forEach((ev) =>
                    element.removeEventListener(ev, reset)
                );
            });
        };
    }, [location.pathname, isHome, navOpen]);

    useEffect(() => {
        if (!isHome) return;
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        if (!navLinks.length) return;
        const sectionIds = [...navLinks].map((l) => l.dataset.section);
        const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((l) => l.classList.remove('section-active'));
                        const active = document.querySelector(
                            `.nav-link[data-section="${entry.target.id}"]`
                        );
                        if (active) active.classList.add('section-active');
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        sections.forEach((s) => sectionObserver.observe(s));
        return () => sectionObserver.disconnect();
    }, [isHome, location.pathname]);

    useEffect(() => {
        document.body.classList.toggle('nav-open', navOpen);
    }, [navOpen]);

    const setMobileNavState = (open) => {
        setNavOpen(open);
    };

    return (
        <>
            <header className="header" id="header" ref={headerRef}>
                <div className="nav-container">
                    {isHome ? (
                        <a
                            href="#home"
                            className="logo magnetic"
                            onClick={(e) => goHomeSection(e, '#home')}
                        >
                            <span className="magnetic-inner">vspr.</span>
                        </a>
                    ) : (
                        <Link to="/" className="logo magnetic">
                            <span className="magnetic-inner">vspr.</span>
                        </Link>
                    )}
                    <nav className="nav-links" aria-label="Primary navigation">
                        {isHome ? (
                            <>
                                <a
                                    href="#about"
                                    className="nav-link magnetic"
                                    data-section="about"
                                    onClick={(e) => goHomeSection(e, '#about')}
                                >
                                    <span className="magnetic-inner">About</span>
                                </a>
                                <a
                                    href="#expertise"
                                    className="nav-link magnetic"
                                    data-section="expertise"
                                    onClick={(e) => goHomeSection(e, '#expertise')}
                                >
                                    <span className="magnetic-inner">Expertise</span>
                                </a>
                                <a
                                    href="#projects"
                                    className="nav-link magnetic"
                                    data-section="projects"
                                    onClick={(e) => goHomeSection(e, '#projects')}
                                >
                                    <span className="magnetic-inner">Projects</span>
                                </a>
                                <Link
                                    to="/team"
                                    className="nav-link magnetic"
                                    onClick={() => setNavOpen(false)}
                                >
                                    <span className="magnetic-inner">Team</span>
<<<<<<< HEAD
=======
                                </a>
                                <Link
                                    to="/blog"
                                    className={`nav-link magnetic${isBlogRoute ? ' active' : ''}`}
                                    onClick={() => setNavOpen(false)}
                                >
                                    <span className="magnetic-inner">Blog</span>
>>>>>>> 1e29075c083722bd6fc6e9ba1f3d258dc4d55f68
                                </Link>
                                <a
                                    href="#contact"
                                    className="nav-link magnetic"
                                    data-section="contact"
                                    onClick={(e) => goHomeSection(e, '#contact')}
                                >
                                    <span className="magnetic-inner">Contact</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/#about"
                                    className="nav-link magnetic"
                                    onClick={(e) => goHomeSection(e, '#about')}
                                >
                                    <span className="magnetic-inner">About</span>
                                </Link>
                                <Link
                                    to="/#expertise"
                                    className="nav-link magnetic"
                                    onClick={(e) => goHomeSection(e, '#expertise')}
                                >
                                    <span className="magnetic-inner">Expertise</span>
                                </Link>
                                <Link
                                    to="/#projects"
                                    className="nav-link magnetic"
                                    onClick={(e) => goHomeSection(e, '#projects')}
                                >
                                    <span className="magnetic-inner">Projects</span>
                                </Link>
                                <Link to="/team" className="nav-link magnetic active">
                                    <span className="magnetic-inner">Team</span>
                                </Link>
                                <Link
                                    to="/blog"
                                    className={`nav-link magnetic${isBlogRoute ? ' active' : ''}`}
                                    onClick={() => setNavOpen(false)}
                                >
                                    <span className="magnetic-inner">Blog</span>
                                </Link>
                                <Link
                                    to="/#contact"
                                    className="nav-link magnetic"
                                    onClick={(e) => goHomeSection(e, '#contact')}
                                >
                                    <span className="magnetic-inner">Contact</span>
                                </Link>
                            </>
                        )}
                    </nav>
                    <a href="mailto:hello@vesperlabs.co" className="nav-btn magnetic">
                        <span className="magnetic-inner">Let&apos;s Talk</span>
                    </a>
                    <button
                        type="button"
                        className="menu-btn"
                        aria-label="Toggle navigation"
                        aria-controls="mobile-nav"
                        aria-expanded={navOpen}
                        onClick={() => setMobileNavState(!navOpen)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            <div
                className="mobile-nav-overlay"
                id="mobile-nav"
                aria-hidden={!navOpen}
            >
                <nav className="mobile-nav-links" aria-label="Mobile navigation">
                    {isHome ? (
                        <>
                            <a
                                href="#about"
                                className="nav-link magnetic"
                                data-section="about"
                                onClick={(e) => goHomeSection(e, '#about')}
                            >
                                <span className="magnetic-inner">About</span>
                            </a>
                            <a
                                href="#expertise"
                                className="nav-link magnetic"
                                data-section="expertise"
                                onClick={(e) => goHomeSection(e, '#expertise')}
                            >
                                <span className="magnetic-inner">Expertise</span>
                            </a>
                            <a
                                href="#projects"
                                className="nav-link magnetic"
                                data-section="projects"
                                onClick={(e) => goHomeSection(e, '#projects')}
                            >
                                <span className="magnetic-inner">Projects</span>
                            </a>
                            <Link
                                to="/team"
                                className="nav-link magnetic"
                                onClick={() => setNavOpen(false)}
                            >
                                <span className="magnetic-inner">Team</span>
<<<<<<< HEAD
=======
                            </a>
                            <Link
                                to="/blog"
                                className={`nav-link magnetic${isBlogRoute ? ' active' : ''}`}
                                onClick={() => setNavOpen(false)}
                            >
                                <span className="magnetic-inner">Blog</span>
>>>>>>> 1e29075c083722bd6fc6e9ba1f3d258dc4d55f68
                            </Link>
                            <a
                                href="#contact"
                                className="nav-link magnetic"
                                data-section="contact"
                                onClick={(e) => goHomeSection(e, '#contact')}
                            >
                                <span className="magnetic-inner">Contact</span>
                            </a>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/#about"
                                className="nav-link magnetic"
                                onClick={(e) => goHomeSection(e, '#about')}
                            >
                                <span className="magnetic-inner">About</span>
                            </Link>
                            <Link
                                to="/#expertise"
                                className="nav-link magnetic"
                                onClick={(e) => goHomeSection(e, '#expertise')}
                            >
                                <span className="magnetic-inner">Expertise</span>
                            </Link>
                            <Link
                                to="/#projects"
                                className="nav-link magnetic"
                                onClick={(e) => goHomeSection(e, '#projects')}
                            >
                                <span className="magnetic-inner">Projects</span>
                            </Link>
                            <Link to="/team" className="nav-link magnetic active">
                                <span className="magnetic-inner">Team</span>
                            </Link>
                            <Link
                                to="/blog"
                                className={`nav-link magnetic${isBlogRoute ? ' active' : ''}`}
                                onClick={() => setNavOpen(false)}
                            >
                                <span className="magnetic-inner">Blog</span>
                            </Link>
                            <Link
                                to="/#contact"
                                className="nav-link magnetic"
                                onClick={(e) => goHomeSection(e, '#contact')}
                            >
                                <span className="magnetic-inner">Contact</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </>
    );
}
