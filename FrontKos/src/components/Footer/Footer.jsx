import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo */}
                <div className="footer-logo">
                    <h2>CacheKos</h2>
                    <p>Temukan kenyamanan di setiap sudut.</p>
                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <h3>Links</h3>
                    <ul>
                        <li><a href="#about">Tentang Kami</a></li>
                        <li><a href="#facilities">Fasilitas</a></li>
                        <li><a href="#contact">Hubungi Kami</a></li>
                        <li><a href="#privacy">Kebijakan Privasi</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-social">
                    <h3>Ikuti Kami</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
                <p>&copy; 2024 CacheKos. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
