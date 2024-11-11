import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons untuk Edit dan Delete
import Swal from 'sweetalert2';
import './Room.css';



const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    nama_kamar: "",
    nomor_kamar: "",
    harga_per_bulan: "",
    harga_per_hari: "",
    fasilitas: "",
    kelengkapan_lain: "",
    catatan_kamar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoom, setEditRoom] = useState(null); // Untuk menampung data kamar yang akan diedit

  // Mengambil data kamar dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Anda harus login untuk melihat daftar kamar.");
      return;
    }

    axios
      .get("http://localhost:8000/api/rooms", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRooms(response.data.data);
      })
      .catch((error) => {
        setError("Gagal mengambil data kamar. Silakan coba lagi.");
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Menangani pengiriman form (tambah atau edit kamar)
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (isEditMode) {
      // Update kamar yang sudah ada
      axios
        .put(`http://localhost:8000/api/rooms/${editRoom.id}`, newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const updatedRoom = response.data.data;
          setRooms(rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room)));
          Swal.fire({
            title: "Sukses",
            text: "Kamar berhasil diperbarui",
            icon: "success",
            timer: 1500
          }).then(() => {
            toggleModal(); // Menutup modal setelah klik OK
          });
          resetForm();
        })
        .catch((error) => {
          setError("Gagal memperbarui kamar. Silakan coba lagi.");
          console.error(error);
        });
    } else {
      // Menambahkan kamar baru
      axios
        .post("http://localhost:8000/api/rooms", newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setRooms((prevRooms) => [...prevRooms, response.data.data]);
          Swal.fire({
            title: "Sukses",
            text: "Kamar berhasil ditambahkan",
            icon: "success",
            timer: 1500
          }).then(() => {
            toggleModal(); // Menutup modal setelah klik OK
          });
          resetForm();
        })
        .catch((error) => {
          setError("Gagal menambahkan kamar. Silakan coba lagi.");
          console.error(error);
        });
    }
  };
  

  // Menghapus kamar berdasarkan ID
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setRooms(rooms.filter((room) => room.id !== id));
        Swal.fire({
          title: "Sukses",
          text: "Kamar berhasil dihapus",
          icon: "success",
          timer: 1500
        }).then(() => {
          
        });
      })
      .catch((error) => {
        setError("Gagal menghapus kamar. Silakan coba lagi.");
        setTimeout(() => setError(""), 3000); // Menghilangkan alert setelah 3 detik
        console.error(error);
      });
  };

  // Mengubah form ke mode edit
  const handleEdit = (room) => {
    setIsEditMode(true);
    setEditRoom(room);
    setNewRoom(room);
    setIsModalOpen(true); // Buka modal untuk edit
  };

  // Menutup modal dan reset form
  const resetForm = () => {
    setNewRoom({
      nama_kamar: "",
      nomor_kamar: "",
      harga_per_bulan: "",
      harga_per_hari: "",
      fasilitas: "",
      kelengkapan_lain: "",
      catatan_kamar: "",
    });
    setError("");
    setSuccess("");
    setIsEditMode(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    resetForm(); // Reset form saat modal ditutup
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">Daftar Kamar</h2>

      {/* Tombol untuk membuka modal tambah kamar */}
      <button className="btn btn-primary mb-4" onClick={toggleModal}>
        Tambah Kamar
      </button>

      {/* Modal Form Tambah/Edit Kamar */}
      {isModalOpen && (
        <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditMode ? 'Edit Kamar' : 'Tambah Kamar Baru'}</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}

                  {/* Form input */}
                  <div className="form-group">
                    <label>Nama Kamar</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nama_kamar"
                      value={newRoom.nama_kamar}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nomor Kamar</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nomor_kamar"
                      value={newRoom.nomor_kamar}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Harga per Bulan</label>
                    <input
                      type="number"
                      className="form-control"
                      name="harga_per_bulan"
                      value={newRoom.harga_per_bulan}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Harga per Hari</label>
                    <input
                      type="number"
                      className="form-control"
                      name="harga_per_hari"
                      value={newRoom.harga_per_hari}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fasilitas</label>
                    <textarea
                      className="form-control"
                      name="fasilitas"
                      value={newRoom.fasilitas}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Kelengkapan Lain</label>
                    <textarea
                      className="form-control"
                      name="kelengkapan_lain"
                      value={newRoom.kelengkapan_lain}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Catatan Kamar</label>
                    <textarea
                      className="form-control"
                      name="catatan_kamar"
                      value={newRoom.catatan_kamar}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                    Tutup
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? 'Simpan Perubahan' : 'Simpan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Daftar Kamar */}
      <div className="row">
  {rooms.map((room) => (
    <div key={room.id} className="col-md-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title-room">{room.nama_kamar}</h5>
          <p className="card-text"><strong>Nomor Kamar:</strong> {room.nomor_kamar}</p>
          <p className="card-text"><strong>Harga Per Bulan:</strong> {room.harga_per_bulan}</p>
          <p className="card-text"><strong>Harga Per Hari:</strong> {room.harga_per_hari}</p>
          
          {/* Menampilkan fasilitas, kelengkapan lain, dan catatan kamar */}
          <p className="card-text"><strong>Fasilitas:</strong> {room.fasilitas}</p>
          <p className="card-text"><strong>Kelengkapan Lain:</strong> {room.kelengkapan_lain}</p>
          <p className="card-text"><strong>Catatan Kamar:</strong> {room.catatan_kamar}</p>
          
          
          {/* Tombol edit dan delete */}
          <div className="btn-aksi">
          <button
            className="btn btn-warning mr-2"
            onClick={() => handleEdit(room)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(room.id)}
          >
            <FaTrash /> Hapus
          </button>
          </div>
          
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Room;
