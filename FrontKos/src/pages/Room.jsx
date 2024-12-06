import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import "./Room.css";

const Room = () => {
  
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [detailRoom, setDetailRoom] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!token) {
      setError("Anda harus login untuk melihat daftar kamar.");
      return;
    }

    axios
      .get(apiUrl+"/api/rooms", {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pastikan semua data sudah benar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isEditMode) {
          axios
            .put(`http://localhost:8000/api/rooms/${editRoom.id}`, newRoom, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
              setRooms(
                rooms.map((room) =>
                  room.id === editRoom.id ? { ...room, ...newRoom } : room
                )
              );
              setSuccess("Kamar berhasil diperbarui");
              Swal.fire("Berhasil!", "Kamar berhasil diperbarui!", "success");
              resetForm();
              setIsModalOpen(false);
            })
            .catch((error) => {
              setError("Gagal memperbarui kamar. Silakan coba lagi.");
              console.error(error);
            });
        } else {
          axios
            .post("http://localhost:8000/api/rooms", newRoom, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
              setRooms([...rooms, response.data.data]);
              setSuccess("Kamar berhasil ditambahkan");
              Swal.fire("Berhasil!", "Kamar berhasil ditambahkan!", "success");
              resetForm();
              setIsModalOpen(false);
            })
            .catch((error) => {
              setError("Gagal menambahkan kamar. Silakan coba lagi.");
              console.error(error);
            });
        }
      }
    });
  };

  const handleDetail = (room) => {
    setDetailRoom(room);
    setIsDetailModalOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        axios
          .delete(`http://localhost:8000/api/rooms/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setRooms(rooms.filter((room) => room.id !== id));
            Swal.fire("Sukses", "Kamar berhasil dihapus", "success");
          })
          .catch((error) => {
            setError("Gagal menghapus kamar. Silakan coba lagi.");
            console.error(error);
          });
      }
    });
  };

  const handleEdit = (room) => {
    setIsEditMode(true);
    setEditRoom(room);
    setNewRoom(room);
    setIsModalOpen(true);
  };

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
    resetForm();
  };

  const toggleDetailModal = () => {
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRooms = rooms.filter((room) =>
    room.nama_kamar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatRupiah = (value) => {
    if (value === undefined || value === null) {
      return "Rp 0";
    }
    return `Rp ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const columns = [
    { name: "Nama Kamar", selector: (row) => row.nama_kamar },
    { name: "Nomor Kamar", selector: (row) => row.nomor_kamar },
    { name: "Harga per Hari", selector: (row) => formatRupiah(row.harga_per_hari) },
    { name: "Harga per Minggu", selector: (row) => formatRupiah(row.harga_per_minggu) },
    { name: "Harga per Bulan", selector: (row) => formatRupiah(row.harga_per_bulan) },
    { name: "Harga per Tahun", selector: (row) => formatRupiah(row.harga_per_tahun) },
    { name: "Fasilitas", selector: (row) => row.fasilitas },
    { name: "Kelengkapan Lain", selector: (row) => row.kelengkapan_lain },
    { name: "Catatan", selector: (row) => row.catatan_kamar },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="d-flex">
          <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row)}><FaEdit /></button>
          <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(row.id)}><FaTrash /></button>
          <button className="btn btn-info btn-sm ml-2" onClick={() => handleDetail(row)}><FaEye /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h2 className="text-center mt-5 mb-5">Daftar Kamar</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cari berdasarkan nama kamar..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button className="btn btn-primary mb-4" onClick={toggleModal}>Tambah Kamar</button>
      
      {isModalOpen && (
  <>
    {/* Backdrop */}
    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

    <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{isEditMode ? "Edit Kamar" : "Tambah Kamar Baru"}</h5>
            <button type="button" className="btn-close" onClick={toggleModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {Object.keys(newRoom).map((field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field} className="form-label">{field.replace('_', ' ').toUpperCase()}</label>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={newRoom[field]}
                    onChange={handleChange}
                    placeholder={`Masukkan ${field.replace('_', ' ')}`}
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
)}

{isDetailModalOpen && (
  <>
    {/* Backdrop */}
    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>

    <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true" style={{ zIndex: 1050 }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detail Kamar</h5>
            <button type="button" className="btn-close" onClick={toggleDetailModal}></button>
          </div>
          <div className="modal-body">
            {detailRoom && (
              <>
                {Object.keys(detailRoom).map((field) => (
                  <p key={field}><strong>{field.replace('_', ' ').toUpperCase()}:</strong> {detailRoom[field]}</p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
)}


      <DataTable columns={columns} data={filteredRooms} pagination />
    </div>
  );
};

export default Room;
