import React, { useState, useEffect } from 'react';
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
    keterangan: '',
    status_sewa: '',
  });
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setError("Failed to fetch rooms. Please try again.");
      }
    };

    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Set default values for 'lama_sewa' based on 'jenis_sewa_kamar'
    if (name === 'jenis_sewa_kamar') {
      let lamaSewaDefault = '';
      switch (value) {
        case '1': // Harian
          lamaSewaDefault = '1';
          break;
        case '2': // Mingguan
          lamaSewaDefault = '7';
          break;
        case '3': // Bulanan
          lamaSewaDefault = '30';
          break;
        case '4': // Tahunan
          lamaSewaDefault = '365';
          break;
        default:
          lamaSewaDefault = '';
      }
      setResidentData({ ...residentData, [name]: value, lama_sewa: lamaSewaDefault });
    } else {
      setResidentData({ ...residentData, [name]: value });
    }
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
      navigate('/residents');
    } catch (error) {
      console.error("Error adding resident:", error.response ? error.response.data : error.message);
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
          <select name="id_kamar" value={residentData.id_kamar} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Kamar</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.nama_kamar}</option>
            ))}
          </select>
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
            <option value="3">Bulanan</option>
            <option value="4">Tahunan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status Penghuni</label>
          <select name="status_penghuni" value={residentData.status_penghuni} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Status</option>
            <option value="1">Belum Menikah</option>
            <option value="2">Menikah</option>
            <option value="3">Janda</option>
            <option value="4">Duda</option>
            <option value="5">Cerai Mati</option>
          </select>
        </div>
        <div className="form-group">
          <label>Pekerjaan</label>
          <select name="pekerjaan" value={residentData.pekerjaan} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Pekerjaan</option>
            <option value="1">Mahasiswa</option>
            <option value="2">Guru</option>
            <option value="3">Polisi</option>
            <option value="4">Dokter</option>
            <option value="5">Perawat</option>
            <option value="6">Programmer</option>
            <option value="7">Lainnya</option>
          </select>
        </div>
        <div className="form-group">
          <label>Jumlah Penghuni</label>
          <input type="number" name="jumlah_penghuni" value={residentData.jumlah_penghuni} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Lama Sewa</label>
          <input type="text" name="lama_sewa" value={residentData.lama_sewa} onChange={handleInputChange} placeholder='Hari...' className="form-control" required />
        </div>
        <div className="form-group">
          <label>Tanggal Masuk</label>
          <input type="date" name="tanggal_masuk" value={residentData.tanggal_masuk} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Keterangan</label>
          <textarea name="keterangan" value={residentData.keterangan} onChange={handleInputChange} className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label>Status Sewa</label>
          <select name="status_sewa" value={residentData.status_sewa} onChange={handleInputChange} className="form-control" required>
            <option value="">Pilih Status</option>
            <option value="1">Aktif</option>
            <option value="2">Nonaktif</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Resident</button>
      </form>
    </div>
  );
};

export default AddResidentPage;
