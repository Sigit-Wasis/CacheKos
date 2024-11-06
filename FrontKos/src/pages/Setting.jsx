import React, { useState, useEffect } from 'react';
import './Setting.css';
import axios from 'axios';

const Setting = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/settings');
                // Ambil data pertama dari array dalam response.data.data
                setSettings(response.data.data[0]);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Could not load settings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    if (loading) {
        return <div className="loading" aria-live="polite">Loading...</div>;
    }

    if (error) {
        return <div className="error" aria-live="assertive">{error}</div>;
    }

    if (!settings) {
        return <div>No data available</div>;
    }

    return (
        <div className="settings-container">
            <h1 className="settings-title">Pengaturan Kost</h1>

            <div className="settings-grid">
                <div className="settings-card">
                    <h2 className="card-title">Informasi Umum</h2>
                    <table className="settings-table">
                        <tbody>
                            <tr>
                                <td className="label">Nama Kost</td>
                                <td>{settings.nama_kost}</td>
                            </tr>
                            <tr>
                                <td className="label">Alamat</td>
                                <td>{settings.alamat}</td>
                            </tr>
                            <tr>
                                <td className="label">Telepon</td>
                                <td>{settings.telepon}</td>
                            </tr>
                            <tr>
                                <td className="label">Email</td>
                                <td>{settings.email}</td>
                            </tr>
                            <tr>
                                <td className="label">Deskripsi</td>
                                <td>{settings.deskripsi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="settings-card">
                    <h2 className="card-title">Pengaturan Pembayaran</h2>
                    <table className="settings-table">
                        <tbody>
                            <tr>
                                <td className="label">Tenggang Waktu</td>
                                <td>{settings.tenggang_waktu} hari</td>
                            </tr>
                            <tr>
                                <td className="label">Biaya Terlambat</td>
                                <td>Rp {parseFloat(settings.biaya_terlambat).toLocaleString('id-ID')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="settings-card">
                    <h2 className="card-title">Media Sosial</h2>
                    <table className="settings-table">
                        <tbody>
                            <tr>
                                <td className="label">Facebook</td>
                                <td>
                                    <a href={settings.facebook} target="_blank" rel="noopener noreferrer">
                                        {settings.facebook}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="label">Instagram</td>
                                <td>
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer">
                                        {settings.instagram}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="label">TikTok</td>
                                <td>
                                    <a href={settings.tiktok} target="_blank" rel="noopener noreferrer">
                                        {settings.tiktok}
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Setting;