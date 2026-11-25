import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <footer className={`footer ${isHome ? "footer-home-bg" : ""}`}>

            {/* Top gradient separator */}
            <div className="footer-top-line" />

            <div className="footer-content">

                {/* CTA Section */}
                <div className="footer-cta">
                    <div className="footer-cta-glow" />
                    <p className="footer-cta-label">Open to collaboration</p>
                    <h4 className="footer-cta-heading">
                        Interested in collaborating?<br />
                        <span>Let's build something remarkable.</span>
                    </h4>
                    <a className="footer-cta-btn" href="/contact">
                        <span>Let's do it!</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </a>
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
                            <a href="/#services">Services</a>
                            <a href="/#portfolio">Portfolio</a>
                            <a href="/#blog">Blog</a>
                            <a href="/#about">About me</a>
                            <a href="/contact">Contact</a>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="footer-social-col">
                        <p className="footer-nav-heading">Connect</p>
                        <div className="footer_icon">
                            <a href="https://www.linkedin.com/in/pokhrelsurya-z/" className="footer-icon-link" aria-label="LinkedIn">
                                <img src="/assets/linkedin.svg" alt="LinkedIn" />
                                <span>LinkedIn</span>
                            </a>
                            <a href="https://www.upwork.com/freelancers/~01a58c5d929441a2dc" className="footer-icon-link" aria-label="Upwork">
                                <img src="/assets/upwork.svg" alt="Upwork" />
                                <span>Upwork</span>
                            </a>
                            <a href="https://github.com/Suriya-po" className="footer-icon-link" aria-label="GitHub">
                                <img src="/assets/github.svg" alt="GitHub" />
                                <span>GitHub</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p className="footer-credits">
                        © 2025 Surya Pokhrel — Designed &amp; Developed with 💚
                    </p>
                    <div className="footer-privacy">
                        <a href="#privacy">Privacy Policy</a>
                        <span className="footer-divider">·</span>
                        <a href="#cookie">Cookie Policy</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
