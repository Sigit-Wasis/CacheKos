import React from 'react';
import './Kamar.css';

const Kamar = () => {
    return (
        <div className="kamar">
            <h2 className="kamar-title">Kamar</h2>
            <p className="kamar-description">
                Tempat nyaman untuk istirahat dan bekerja
            </p>
            <div className="kamar-grid">
                <div className="kamar-card">
                    <img
                        src="https://i.pinimg.com/736x/91/8f/13/918f13433b3725afeebbacbb108ec509.jpg"
                        alt="Dining"
                        className="kamar-image"
                    />
                    <p className="kamar-text">Dining</p>
                </div>
                <div className="kamar-card">
                    <img
                        src="https://i.pinimg.com/736x/1c/2b/b8/1c2bb8d0ad19574a83c4d67ecb1f8031.jpg"
                        alt="Living"
                        className="kamar-image"
                    />
                    <p className="kamar-text">Living</p>
                </div>
                <div className="kamar-card">
                    <img
                        src="https://i.pinimg.com/736x/b4/b9/a1/b4b9a1a08c59d4284afeb3d3e773288b.jpg"
                        alt="Bedroom"
                        className="kamar-image"
                    />
                    <p className="kamar-text">Bedroom</p>
                </div>
            </div>
        </div>
    );
};

export default Kamar;
