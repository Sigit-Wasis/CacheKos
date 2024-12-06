import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <div className="contact-content">
                <h1 className="contact-title">Hubungi Kami!</h1>
                <p className="contact-description">
                    Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
                </p>
                <form className="contact-form">
                    <label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name *"
                            required
                            className="contact-input"
                        />
                    </label>
                    <label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            required
                            className="contact-input"
                        />
                    </label>
                    <label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number *"
                            required
                            className="contact-input"
                        />
                    </label>
                    <button type="submit" className="contact-button">
                        SEND
                    </button>
                </form>
            </div>
            <div className="contact-image">
                <img
                    src="https://i.pinimg.com/736x/3f/1c/b9/3f1cb97aa3408d48c2da4ebd2e73a77b.jpg"
                    alt="Kost Area"
                />
            </div>
        </div>
    );
};

export default Contact;
