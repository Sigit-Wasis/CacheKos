import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Fasilitas.css';

const Fasilitas = () => {
    const navigate = useNavigate();

    return (
        <div className="fasilitas">
            <section className="kost-details">
                <div className="kost-content">
                    <h2>Detail Kost</h2>
                    <p>
                        Temukan kenyamanan dan ketenangan di kost kami, yang dilengkapi dengan fasilitas terbaik
                        dan lokasi strategis di pusat kota.
                    </p>

                    <div className="details">
                        <div className="location">
                            <h3>Lokasi</h3>
                            <ul>
                                <li>Restoran/Pusat Jajanan</li>
                                <li>Stasiun</li>
                                <li>Terminal</li>
                                <li>Mini Market</li>
                                <li>Supermarket</li>
                                <li>Pasar Tradisional</li>
                                <li>Bank/ATM</li>
                                <li>Pengiriman Paket</li>
                                <li>Klinik</li>
                                <li>Apotik</li>
                            </ul>
                        </div>
                        <div className="facilities">
                            <h3>Fasilitas</h3>
                            <ul>
                                <li>AC</li>
                                <li>Wifi</li>
                                <li>Kasur</li>
                                <li>Lemari Baju</li>
                                <li>Meja</li>
                                <li>Kamar Mandi (Dalam/Luar)</li>
                                <li>Listrik Token</li>
                                <li>Parkiran Motor</li>
                                <li>Dapur Umum</li>
                                <li>Jemuran</li>
                                <li>CCTV</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Fasilitas;
