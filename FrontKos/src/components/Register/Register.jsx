import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        nama_lengkap: '',
        email: '',
        alamat: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                username: formData.username,
                nama_lengkap: formData.nama_lengkap,
                email: formData.email,
                alamat: formData.alamat,
                password: formData.password
            });

            if (response.data.message === 'Register berhasil.') {
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data || 'An error occurred during registration');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {['username', 'nama_lengkap', 'email', 'alamat', 'password', 'confirmPassword'].map((field) => (
                        <div className="input-group" key={field}>
                            <input
                                type={field.includes('password') ? 'password' : 'text'}
                                name={field}
                                placeholder={field.replace('_', ' ').toUpperCase()}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit" className="submit-btn">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
