import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for Edit and Delete
import Swal from 'sweetalert2';
import './Room.css';

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    nama_kamar: "",
    nomor_kamar: "",
    harga_per_hari: "",
    harga_per_minggu: "",
    harga_per_bulan: "",
    harga_per_tahun: "",
    fasilitas: "",
    kelengkapan_lain: "",
    catatan_kamar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoom, setEditRoom] = useState(null); // To store room data for editing

  // Fetching rooms data from API when the component is mounted
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

  // Handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handling form submission (add or edit room)
   // Handling form submission (add or edit room)
   const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const token = localStorage.getItem("token");

    if (isEditMode) {
      // If in edit mode, update room data
      axios
        .put(`http://localhost:8000/api/rooms/${editRoom.id}`, newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setRooms(
            rooms.map((room) =>
              room.id === editRoom.id ? { ...room, ...newRoom } : room
            )
          );
          setSuccess("Kamar berhasil diperbarui");
          Swal.fire({
            title: 'Berhasil!',
            text: 'Kamar berhasil diperbarui!',
            icon: 'success',
            timer: 1500
          });
          resetForm();
          setIsModalOpen(false);
        })
        .catch((error) => {
          setError("Gagal memperbarui kamar. Silakan coba lagi.");
          console.error(error);
        });
    } else {
      // If adding a new room, send a POST request
      axios
        .post("http://localhost:8000/api/rooms", newRoom, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setRooms([...rooms, response.data.data]);
          setSuccess("Kamar berhasil ditambahkan");
          Swal.fire({
            title: 'Berhasil!',
            text: 'Kamar berhasil ditambahkan!',
            icon: 'success',
            timer: 1500
          });
          resetForm();
          setIsModalOpen(false);
        })
        .catch((error) => {
          setError("Gagal menambahkan kamar. Silakan coba lagi.");
          console.error(error);
        });
    }
  };

  // Deleting room by ID
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
        });
      })
      .catch((error) => {
        setError("Gagal menghapus kamar. Silakan coba lagi.");
        setTimeout(() => setError(""), 3000); // Remove alert after 3 seconds
        console.error(error);
      });
  };

  // Handling edit button click to pre-fill the form with room data
  const handleEdit = (room) => {
    setIsEditMode(true);
    setEditRoom(room);
    setNewRoom(room);
    setIsModalOpen(true); // Open modal for edit
  };

  // Resetting the form
  const resetForm = () => {
    setNewRoom({
      nama_kamar: "",
      nomor_kamar: "",
      harga_per_hari: "",
      harga_per_minggu: "",
      harga_per_bulan: "",
      harga_per_tahun: "",
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
    resetForm(); // Reset form when modal is closed
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">Daftar Kamar</h2>

      {/* Button to open the Add Room modal */}
      <button className="btn btn-primary mb-4" onClick={toggleModal}>
        Tambah Kamar
      </button>

      {/* Modal Form for Adding/Editing Room */}
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

                  {/* Form inputs for room details */}
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
                    <label>Harga per Minggu</label>
                    <input
                      type="number"
                      className="form-control"
                      name="harga_per_minggu"
                      value={newRoom.harga_per_minggu}
                      onChange={handleChange}
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
                    <label>Harga per Tahun</label>
                    <input
                      type="number"
                      className="form-control"
                      name="harga_per_tahun"
                      value={newRoom.harga_per_tahun}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Fasilitas</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fasilitas"
                      value={newRoom.fasilitas}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Kelengkapan Lain</label>
                    <input
                      type="text"
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
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                    Tutup
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Perbarui" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Rooms Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Nama Kamar</th>
            <th>Nomor Kamar</th>
            <th>Harga per Hari</th>
            <th>Harga per Minggu</th>
            <th>Harga per Bulan</th>
            <th>Harga per Tahun</th>
            <th>Fasilitas</th>
            <th>Kelengkapan Lain</th>
            <th>Catatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
  {rooms.map((room) => (
    <tr key={room.id}>
      <td>{room.nama_kamar}</td>
      <td>{room.nomor_kamar}</td>
      <td>{room.harga_per_hari}</td>
      <td>{room.harga_per_minggu}</td>
      <td>{room.harga_per_bulan}</td>
      <td>{room.harga_per_tahun}</td>
      <td>{room.fasilitas}</td>
      <td>{room.kelengkapan_lain}</td>
      <td>{room.catatan_kamar}</td>
      <td>
        <div className="d-flex">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEdit(room)}
          >
            <FaEdit />
          </button>
          <button
            className="btn btn-danger btn-sm ml-2"
            onClick={() => handleDelete(room.id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default Room;
