import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css'; // Pastikan Anda memiliki file User.css untuk styling

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data); // Akses data `users` dari respons API
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Gagal mengambil data pengguna. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Daftar Pengguna</h1>
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{user.nama_lengkap}</h5>
                <p className="card-text"><strong>Username:</strong> {user.username}</p>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Alamat:</strong> {user.alamat}</p>
                <p className="card-text"><strong>Tanggal Bergabung:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated on {new Date(user.updated_at).toLocaleDateString()}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
