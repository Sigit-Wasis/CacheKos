import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddResidentPage = () => {
  const [residentData, setResidentData] = useState({
    nama_penghuni: '',
    id_kamar: '',
    no_handphone: '',
    jenis_kelamin: '',
    no_ktp: '',
    jenis_sewa_kamar: '',
    status_penghuni: '',
    pekerjaan: '',
    jumlah_penghuni: '',
    lama_sewa: '',
    tanggal_masuk: '',
    keterangan: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setResidentData({ ...residentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'http://127.0.0.1:8000/api/residents',
        residentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/residents');  // Redirect ke halaman daftar residents setelah berhasil menambahkan
    } catch (error) {
      console.error("Error adding resident:", error);
      setError("Failed to add resident. Please check your data and try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Resident</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama Penghuni</label>
          <input type="text" name="nama_penghuni" value={residentData.nama_penghuni} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Id Kamar</label>
          <input type="text" name="id_kamar" value={residentData.id_kamar} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>No Handphone</label>
          <input type="text" name="no_handphone" value={residentData.no_handphone} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Jenis Kelamin</label>
          <select name="jenis_kelamin" value={residentData.jenis_kelamin} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Jenis Kelamin</option>
            <option value="1">Pria</option>
            <option value="2">Wanita</option>
          </select>
        </div>
        <div className="form-group">
          <label>No KTP</label>
          <input type="text" name="no_ktp" value={residentData.no_ktp} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Jenis Sewa Kamar</label>
          <select name="jenis_sewa_kamar" value={residentData.jenis_sewa_kamar} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Jenis Sewa</option>
            <option value="1">Harian</option>
            <option value="2">Mingguan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status Penghuni</label>
          <select name="status_penghuni" value={residentData.status_penghuni} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Status</option>
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>
        </div>
        <div className="form-group">
          <label>Pekerjaan</label>
          <input type="text" name="pekerjaan" value={residentData.pekerjaan} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Jumlah Penghuni</label>
          <input type="number" name="jumlah_penghuni" value={residentData.jumlah_penghuni} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Lama Sewa</label>
          <input type="text" name="lama_sewa" value={residentData.lama_sewa} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Tanggal Masuk</label>
          <input type="date" name="tanggal_masuk" value={residentData.tanggal_masuk} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Keterangan</label>
          <textarea name="keterangan" value={residentData.keterangan} onChange={handleInputChange} className="form-control"></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Resident</button>
      </form>
    </div>
  );
};

export default AddResidentPage;
