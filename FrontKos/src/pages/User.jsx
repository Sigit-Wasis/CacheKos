import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css';
import Swal from 'sweetalert2';

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUser, setNewUser] = useState({ nama_lengkap: '', username: '', email: '', alamat: '' });
  const [currentUserId, setCurrentUserId] = useState(null);
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
        setError("Gagal mengambil data pengguna. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handleAddUser = async () => {
    const token = localStorage.getItem('token');
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
      setError("Gagal menambahkan pengguna. Silakan coba lagi.");
    }
  };

  const handleEditUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${currentUserId}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => (user.id === currentUserId ? response.data.data : user)));
      setShowModal(false);
      setIsEditing(false);
      setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' });
      setCurrentUserId(null);
    } catch (error) {
      setError("Gagal memperbarui pengguna. Silakan coba lagi.");
    }
  };

  const handleDeleteUser = async (id) => {
    const token = localStorage.getItem('token');
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data ini akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus data ini!',
      cancelButtonText: 'Batal'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(users.filter(user => user.id !== id));
          Swal.fire('Terhapus!', 'Data pengguna telah berhasil dihapus.', 'success');
        } catch (error) {
          setError("Gagal menghapus pengguna. Silakan coba lagi.");
          Swal.fire('Gagal!', 'Data pengguna gagal dihapus.', 'error');
        }
      }
    });
  };

  const openEditModal = (user) => {
    setCurrentUserId(user.id);
    setNewUser({ nama_lengkap: user.nama_lengkap, username: user.username, email: user.email, alamat: user.alamat });
    setIsEditing(true);
    setShowModal(true);
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-container mt-5">
      <div className="user-header">
        <h1 className="user-title">Daftar Pengguna</h1>
        <button className="user-add-user-btn" onClick={() => {
          setShowModal(true);
          setIsEditing(false);
          setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' });
        }}>
          Tambah User
        </button>
      </div>
      <div className="user-row">
        {users.map((user) => (
          <div className="user-col-md-4 mb-4" key={user.id}>
            <div className="user-card h-100">
              <div className="user-card-body">
                <h5 className="user-card-title"><strong>Username:</strong> {user.username}</h5>
                <p className="user-card-text"><strong>Nama Lengkap:</strong> {user.nama_lengkap}</p>
                <p className="user-card-text"><strong>Email:</strong> {user.email}</p>
                <p className="user-card-text"><strong>Alamat:</strong> {user.alamat}</p>
              </div>
              <div className="user-card-footer">
                <button className="user-btn user-btn-warning me-2" onClick={() => openEditModal(user)}>Edit</button>
                <button className="user-btn user-btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="user-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="user-modal-dialog">
            <div className="user-modal-content">
              <div className="user-modal-header">
                <h5 className="user-modal-title">{isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="user-modal-body">
                <input type="text" placeholder="Nama Lengkap" className="form-control mb-2" value={newUser.nama_lengkap} onChange={(e) => setNewUser({ ...newUser, nama_lengkap: e.target.value })} />
                <input type="text" placeholder="Username" className="form-control mb-2" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
                <input type="email" placeholder="Email" className="form-control mb-2" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <input type="text" placeholder="Alamat" className="form-control mb-2" value={newUser.alamat} onChange={(e) => setNewUser({ ...newUser, alamat: e.target.value })} />
              </div>
              <div className="user-modal-footer">
                <button className="user-btn user-btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
                <button className="user-btn user-btn-primary" onClick={isEditing ? handleEditUser : handleAddUser}>
                  {isEditing ? 'Simpan Perubahan' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
