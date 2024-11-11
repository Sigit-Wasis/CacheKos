import React, { useState, useEffect } from 'react';
import './Setting.css';
import axios from 'axios';

const Setting = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    // Fetch settings from the API
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/settings');
                setSettings(response.data.data[0]);
                setFormData(response.data.data[0]);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Could not load settings. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Save the form data when editing is done
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8000/api/settings/1`, formData);
            setSettings(formData);
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving data:", err);
            setError("Could not save settings. Please try again later.");
        }
    };

    // Loading state
    if (loading) {
        return <div className="loading" aria-live="polite">Loading...</div>;
    }

    // Error handling
    if (error) {
        return <div className="error" aria-live="assertive">{error}</div>;
    }

    // No data available case
    if (!settings) {
        return <div>No data available</div>;
    }

    return (
        <div className="settings-container">
            <h1 className="settings-title">Pengaturan</h1>

            <div className="settings-wrapper">
                {/* Card Profil Kost */}
                <div className="settings-card">
                    <h2 className="card-title">Profil Kost</h2>
                    <div className="settings-details">
                        <p><strong>Nama Kost:</strong> {isEditing ? (
                            <input name="nama_kost" value={formData.nama_kost || ""} onChange={handleInputChange} />
                        ) : settings.nama_kost}</p>

                        <p><strong>Alamat Kost:</strong> {isEditing ? (
                            <input name="alamat" value={formData.alamat || ""} onChange={handleInputChange} />
                        ) : settings.alamat}</p>

                        <p><strong>Telepon Kost:</strong> {isEditing ? (
                            <input name="telepon" value={formData.telepon || ""} onChange={handleInputChange} />
                        ) : settings.telepon}</p>

                        <p><strong>Email Kost:</strong> {isEditing ? (
                            <input name="email" value={formData.email || ""} onChange={handleInputChange} />
                        ) : settings.email}</p>

                <h2 className="card-title">Social Media</h2>
                        <p><strong>Tiktok Kost:</strong> {isEditing ? (
                            <input name="tiktok" value={formData.tiktok || ""} onChange={handleInputChange} />
                        ) : settings.tiktok}</p>
                        <p><strong>Instagram Kost:</strong> {isEditing ? (
                            <input name="instagram" value={formData.instagram || ""} onChange={handleInputChange} />
                        ) : settings.instagram}</p>
                        
                    </div>
                </div>

                {/* Card Pengaturan Kost */}
                <div className="settings-card">
                    <h2 className="card-title">Pengaturan Kost</h2>
                    <div className="settings-details">
                        <p><strong>Tenggang Waktu Keterlambatan:</strong> {isEditing ? (
                            <input 
                                name="tenggang_waktu" 
                                value={formData.tenggang_waktu || ""} 
                                onChange={handleInputChange} 
                            />
                        ) : `${settings?.tenggang_waktu || 0} Hari`}</p>

                        <p><strong>Biaya Keterlambatan per Hari:</strong> {isEditing ? (
                            <input 
                                name="biaya_terlambat" 
                                value={formData.biaya_terlambat || ""} 
                                onChange={handleInputChange} 
                            />
                        ) : `Rp ${parseFloat(settings?.biaya_terlambat || 0).toLocaleString('id-ID')}`}</p>

                        <div className="buttons">
                            <button onClick={() => setIsEditing(!isEditing)} className="edit-button">
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                            {isEditing && <button onClick={handleSave} className="save-button">Save</button>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Setting;
