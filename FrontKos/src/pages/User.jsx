// User.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ nama_lengkap: '', username: '', email: '', alamat: '' });
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
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Gagal mengambil data pengguna. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleAddUser = async () => {
    const token = localStorage.getItem('token');
    console.log(newUser)
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data.data]);
      setShowModal(false);
      setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' });
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Gagal menambahkan pengguna. Silakan coba lagi.");
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="header">
        <h1 className="title">Daftar Pengguna</h1>
        <button className="btn btn-primary add-user-btn" onClick={() => setShowModal(true)}>
          Tambah User
        </button>
      </div>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title"><strong>Username:</strong> {user.username}</h5>
                <p className="card-text"><strong>Nama Lengkap:</strong> {user.nama_lengkap}</p>
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

      {/* Modal Form */}
      {showModal && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Pengguna</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="form-control mb-2"
                  value={newUser.nama_lengkap}
                  onChange={(e) => setNewUser({ ...newUser, nama_lengkap: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="form-control mb-2"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control mb-2"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Alamat"
                  className="form-control mb-2"
                  value={newUser.alamat}
                  onChange={(e) => setNewUser({ ...newUser, alamat: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-primary" onClick={handleAddUser}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
