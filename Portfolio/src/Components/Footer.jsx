import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    const location = useLocation();
    const isHome = location.pathname === "/"; // true ONLY on "/"

    return (
        <footer className={`footer ${isHome ? "footer-home-bg" : ""}`}>

            <div className="footer-content">
                <div className="FooterStyles__AddContainer-sc-toix7a-4 jxwHBE">
                    <h4 className="FooterStyles__AddHeading-sc-toix7a-6 bJRaxt">
                        Interested in collaborating? Let's schedule a time to chat.
                    </h4>
                    <a className="invertButton__InvertButtonIternal-sc-1ai4jgu-1 cfMqky" href="/contact/">
                        Let's do it!
                    </a>
                </div>

                <h3 className="footer-title">SURIYa</h3>

                <div className="footer-links">
                    <a href="#services">Services</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#blog">Blog</a>
                    <a href="#about">About me</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="footer_icon">
                    <a href="https://www.linkedin.com/in/pokhrelsurya-z/"><img src="/assets/linkedin.svg" alt="LinkedIn" /></a>
                    <a href="https://www.upwork.com/freelancers/~01a58c5d929441a2dc"><img src="/assets/upwork.svg" alt="Upwork" /></a>
                    <a href="https://github.com/Suriya-po"><img src="/assets/github.svg" alt="GitHub" /></a>
                </div>

                <p className="footer-credits">
                    Website developed and designed by Surya Pokhrel. © 2025
                </p>

                <div className="footer-privacy">
                    <a href="#privacy">Privacy Policy</a> |
                    <a href="#cookie">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
