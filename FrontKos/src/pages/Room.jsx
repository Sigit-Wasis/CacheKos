import React, { useEffect, useState } from "react";
import axios from "axios";

const Room = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Jika token tidak ada, tampilkan pesan error
    if (!token) {
      setError("Anda harus login untuk melihat daftar kamar.");
      return;
    }

    // Ambil data room dari API Laravel
    axios
      .get("http://localhost:8000/api/rooms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data); // Cek data yang diterima dari API
        // Ambil data kamar dari response.data.data
        setRooms(response.data.data); // Set data room ke state rooms
      })
      .catch((error) => {
        setError("Gagal mengambil data kamar. Silakan coba lagi.");
        console.error(error); // Log error di console untuk debugging
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-5">Daftar Kamar</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {rooms.map((room) => (
          <div className="col-md-4" key={room.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{room.nama_kamar}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Nomor Kamar: {room.nomor_kamar}
                </h6>
                <p className="card-text">
                  Harga per Bulan: Rp {room.harga_per_bulan.toLocaleString()} <br />
                  Harga per Hari: Rp {room.harga_per_hari.toLocaleString()} <br />
                  Fasilitas: {room.fasilitas} <br />
                  Kelengkapan Lain: {room.kelengkapan_lain} <br />
                  Catatan: {room.catatan_kamar}
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