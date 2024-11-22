import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './User.css';
import Swal from 'sweetalert2';

const User = () => {
  const [users, setUsers] = useState([]); // Data pengguna
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Error handling
  const [showModal, setShowModal] = useState(false); // Menampilkan modal
  const [isEditing, setIsEditing] = useState(false); // Menandai mode edit
  const [newUser, setNewUser] = useState({ nama_lengkap: '', username: '', email: '', alamat: '' }); // Data input pengguna baru
  const [currentUserId, setCurrentUserId] = useState(null); // ID pengguna yang sedang diedit
  const [page, setPage] = useState(1); // Halaman saat ini
  const [perPage, setPerPage] = useState(6); // Jumlah item per halaman
  const [totalPages, setTotalPages] = useState(1); // Total halaman
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!token) {
      navigate('/login'); // Redirect ke login jika token tidak ada
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page: page, // Halaman yang diminta
            per_page: perPage, // Jumlah data per halaman
          },
        });

        setUsers(response.data.data); // Update data pengguna
        setTotalPages(response.data.pagination.last_page); // Simpan total halaman
      } catch (error) {
        setError("Gagal mengambil data pengguna. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, perPage, navigate]);

  // Fungsi untuk menangani klik tombol "Load More"
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(page + 1); // Halaman berikutnya
    }
  };

  // Fungsi untuk menangani klik tombol "Previous"
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1); // Halaman sebelumnya
    }
  };

  // Fungsi untuk menambahkan pengguna baru
  const handleAddUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([response.data.data, ...users]); // Tambahkan pengguna baru ke daftar
      setShowModal(false); // Tutup modal
      setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' }); // Reset input
    } catch (error) {
      setError("Gagal menambahkan pengguna. Silakan coba lagi.");
    }
  };

  // Fungsi untuk mengedit data pengguna
  const handleEditUser = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${currentUserId}`, newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => (user.id === currentUserId ? response.data.data : user))); // Update data di daftar
      setShowModal(false); // Tutup modal
      setIsEditing(false); // Reset mode edit
      setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' }); // Reset input
      setCurrentUserId(null);
    } catch (error) {
      setError("Gagal memperbarui pengguna. Silakan coba lagi.");
    }
  };

  // Fungsi untuk menghapus pengguna
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
          setUsers(users.filter(user => user.id !== id)); // Hapus data dari daftar
          Swal.fire('Terhapus!', 'Data pengguna telah berhasil dihapus.', 'success');
        } catch (error) {
          setError("Gagal menghapus pengguna. Silakan coba lagi.");
          Swal.fire('Gagal!', 'Data pengguna gagal dihapus.', 'error');
        }
      }
    });
  };

  // Fungsi untuk membuka modal edit
  const openEditModal = (user) => {
    setCurrentUserId(user.id); // Simpan ID pengguna yang sedang diedit
    setNewUser({ nama_lengkap: user.nama_lengkap, username: user.username, email: user.email, alamat: user.alamat }); // Isi form dengan data pengguna
    setIsEditing(true); // Aktifkan mode edit
    setShowModal(true); // Tampilkan modal
  };

  // Render jika data masih loading atau terjadi error
  if (loading && page === 1) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-container mt-5">
      <div className="user-header">
        <h1 className="user-title">Daftar Pengguna</h1>
        <button
          className="user-add-user-btn"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setNewUser({ nama_lengkap: '', username: '', email: '', alamat: '' });
          }}
        >
          Tambah User
        </button>
      </div>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="user-card">
              <table className="table table-borderless user-table">
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td>{user.nama_lengkap}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>{user.alamat}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card-footer text-end">
              <button
                className="btn btn-warning me-2 edit-btn"
                onClick={() => openEditModal(user)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger delete-btn"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Previous */}
      {page > 1 && (
        <div className="text-center">
          <button
            className="btn btn-secondary me-2"
            onClick={handlePrevious}
          >
            Previous
          </button>
        </div>
      )}

      {/* Tombol Load More */}
      {page < totalPages && (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}

      {/* Keterangan halaman */}
      <div className="text-center mt-2">
        <p>{page} of {totalPages}</p>
      </div>

      {/* Modal untuk tambah/edit pengguna */}
      {showModal && (
        <div className="user-modal" style={{ display: 'flex' }}>
          <div className="user-modal-content">
            <div className="user-modal-header">
              <h5 className="modal-title">{isEditing ? 'Edit Pengguna' : 'Tambah Pengguna'}</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="user-modal-body">
              <div className="mb-2">
                <label htmlFor="nama_lengkap" className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  id="nama_lengkap"
                  className="form-control"
                  value={newUser.nama_lengkap}
                  onChange={(e) => setNewUser({ ...newUser, nama_lengkap: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="alamat" className="form-label">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  className="form-control"
                  value={newUser.alamat}
                  onChange={(e) => setNewUser({ ...newUser, alamat: e.target.value })}
                />
              </div>
            </div>
            <div className="user-modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Tutup</button>
              <button type="button" className="btn btn-primary" onClick={isEditing ? handleEditUser : handleAddUser}>
                {isEditing ? 'Simpan Perubahan' : 'Tambah'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
