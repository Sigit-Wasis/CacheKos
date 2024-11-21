import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Fasilitas from '../components/Fasilitas/Fasilitas';
import Kamar from '../components/Kamar/Kamar';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';

const LandingPage = () => {
    const navigate = useNavigate(); 

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="logo">Cache Kos</div>
                <nav className="nav">
                    <a href="#fasilitas">Fasilitas</a>
                    <a href="#kamar"> Kamar</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Choose your room with CacheKos</h1>
                    <p>
                        Bringing interiors to life, understanding the person or people 
                        living in a home is far greater need in design.
                    </p>
                    <div className="button-group">
                        <button onClick={() => navigate('/login')} className="login-btn">Login</button>
                        <button onClick={() => navigate('/register')} className="register-btn">Register</button>
                    </div>
                </div>
            </section>

            {/* New Section for Kost Details */}
           {/* Section Fasilitas */}
           <section id="fasilitas">
                <Fasilitas />
            </section>

            {/* Section Kamar */}
            <section id="kamar">
                <Kamar />
            </section>

            {/* Section Contact */}
            <section id="contact">
                <Contact />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;
