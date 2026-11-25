import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AskQuestion from './AskQuestion';
import './footer.css';

const Footer = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [askOpen, setAskOpen] = useState(false);

    return (
        <footer className={`footer ${isHome ? "footer-home-bg" : ""}`}>

            {/* Top gradient separator */}
            <div className="footer-top-line" />

            <div className="footer-content">

                {/* CTA Section */}
                <div className="footer-cta">
                    <div className="footer-cta-glow" />
                    <div className="footer-cta-body">
                        <div className="footer-cta-text">
                            <p className="footer-cta-label">Open to collaboration</p>
                            <h4 className="footer-cta-heading">
                                Interested in collaborating?{' '}
                                <span>Let's build something remarkable.</span>
                            </h4>
                        </div>
                        <button
                            type="button"
                            className="footer-cta-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setAskOpen(true);
                            }}
                        >
                            Let's do it!
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Middle Grid: Brand + Links + Social */}
                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-brand">
                        <h3 className="footer-title">SURIYa</h3>
                        <p className="footer-brand-tagline">
                            Building intelligent systems at the intersection of AI, security &amp; full-stack engineering.
                        </p>
                    </div>

                    {/* Nav Links */}
                    <div className="footer-nav">
                        <p className="footer-nav-heading">Navigate</p>
                        <div className="footer-links">
                            <Link to="/">Services</Link>
                            <Link to="/portfolio">Portfolio</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/about">About me</Link>
                            <button
                                type="button"
                                className="footer-link-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAskOpen(true);
                                }}
                            >
                                Contact
                            </button>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="footer-social-col">
                        <p className="footer-nav-heading">Connect</p>
                        <div className="footer_icon">
                            <a
                                href="https://www.linkedin.com/in/pokhrelsurya-z/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-icon-link"
                                aria-label="LinkedIn"
                            >
                                <img src="/assets/linkedin.svg" alt="LinkedIn" />
                                <span>LinkedIn</span>
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~01a58c5d929441a2dc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-icon-link"
                                aria-label="Upwork"
                            >
                                <img src="/assets/upwork.svg" alt="Upwork" />
                                <span>Upwork</span>
                            </a>
                            <a
                                href="https://github.com/Suriya-po"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-icon-link"
                                aria-label="GitHub"
                            >
                                <img src="/assets/github.svg" alt="GitHub" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p className="footer-credits">
                        © 2025 Surya Pokhrel — Designed &amp; Developed by Surya Pokhrel
                    </p>
                    <div className="footer-privacy">
                        <a href="#privacy">Privacy Policy</a>
                        <span className="footer-divider">·</span>
                        <a href="#cookie">Cookie Policy</a>
                    </div>
                </div>

            </div>

            {askOpen && <AskQuestion onClose={() => setAskOpen(false)} />}
        </footer>
    );
};

export default Footer;
