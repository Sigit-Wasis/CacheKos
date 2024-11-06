import React, { useState, useEffect } from 'react';
import './Setting.css';

const Setting = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/settings');
                if (!response.ok) {
                    throw new Error('Failed to fetch settings');
                }
                const data = await response.json();
                setSettings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="settings-container">
            <h1 className="settings-title">Pengaturan Kost</h1>

            <div className="settings-grid">
                {/* Info Umum */}
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
                        </tbody>
                    </table>
                </div>

                {/* Pengaturan Pembayaran */}
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
                                <td>Rp {parseInt(settings.biaya_terlambat).toLocaleString('id-ID')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Media Sosial */}
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