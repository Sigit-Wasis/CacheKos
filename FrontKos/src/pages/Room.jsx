import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap

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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Anda harus login untuk melihat daftar kamar.");
      return;
    }

    // Mengambil daftar kamar dari API
    axios
      .get("http://localhost:8000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

   
    const roomData = {
      ...newRoom,
     
    };

    // Mengirim data kamar baru ke API
    console.log(roomData);
    axios
      .post("http://localhost:8000/api/rooms", roomData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setRooms((prevRooms) => [...prevRooms, response.data.data]); // Menambahkan kamar baru ke daftar
          setSuccess("Kamar berhasil ditambahkan!");
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
          toggleModal(); // Menutup modal setelah sukses menambah data
        } else {
          setError("Gagal menambahkan kamar. Silakan coba lagi.");
        }
      })
      .catch((error) => {
        setError("Gagal menambahkan kamar. Silakan coba lagi.");
        console.error(error);
      });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setError("");
    setSuccess("");
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">Daftar Kamar</h2>

      {/* Tombol untuk membuka modal tambah kamar */}
      <button className="btn btn-primary mb-4" onClick={toggleModal}>
        Tambah Kamar
      </button>

      {/* Modal Form Tambah Kamar */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Kamar Baru</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {/* Tampilkan error atau success di dalam modal */}
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}

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
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Tutup
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Simpan
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
          <div className="col-md-4" key={room.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-header bg-primary ">
                <h5 className="card-title mb-0 text-white">{room.nama_kamar}</h5>
              </div>

              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  Nomor Kamar: {room.nomor_kamar}
                </h6>
                <p className="card-text">
                  <strong>Harga per Bulan:</strong> Rp{" "}
                  {room.harga_per_bulan.toLocaleString()}
                  <br />
                  <strong>Harga per Hari:</strong> Rp{" "}
                  {room.harga_per_hari.toLocaleString()}
                  <br />
                  <strong>Fasilitas:</strong> {room.fasilitas}
                  <br />
                  <strong>Kelengkapan Lain:</strong> {room.kelengkapan_lain}
                  <br />
                  <strong>Catatan:</strong> {room.catatan_kamar}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
