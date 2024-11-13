import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditResidentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [residentData, setResidentData] = useState({
    nama_penghuni: '',
    id_kamar: '',
    no_handphone: '',
    jenis_kelamin: 1,
    no_ktp: '',
    jenis_sewa_kamar: 1,
    status_penghuni: 1,
    pekerjaan: 1,
    jumlah_penghuni: '',
    lama_sewa: '',
    tanggal_masuk: '',
    keterangan: '',
    status_sewa: 1,
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchResidentAndRooms = async () => {
      try {
        // Fetch resident data
        const residentResponse = await axios.get(`http://127.0.0.1:8000/api/residents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResidentData(residentResponse.data.data);

        // Fetch room options
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(roomResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidentAndRooms();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResidentData({
      ...residentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://127.0.0.1:8000/api/residents/${id}`, residentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/resident');
    } catch (error) {
      console.error("Error updating resident:", error);
      setError("Failed to update resident data. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5">
      <h1>Edit Resident</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama Penghuni</label>
          <input
            type="text"
            className="form-control"
            name="nama_penghuni"
            value={residentData.nama_penghuni}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kamar</label>
          <select
            className="form-select"
            name="id_kamar"
            value={residentData.id_kamar}
            onChange={handleChange}
          >
            <option value="">Pilih Kamar</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.nama_kamar}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">No Handphone</label>
          <input
            type="text"
            className="form-control"
            name="no_handphone"
            value={residentData.no_handphone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jenis Kelamin</label>
          <select
            className="form-select"
            name="jenis_kelamin"
            value={residentData.jenis_kelamin}
            onChange={handleChange}
          >
            <option value={1}>Pria</option>
            <option value={2}>Wanita</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">No KTP</label>
          <input
            type="text"
            className="form-control"
            name="no_ktp"
            value={residentData.no_ktp}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Jenis Sewa Kamar</label>
          <select
            className="form-select"
            name="jenis_sewa_kamar"
            value={residentData.jenis_sewa_kamar}
            onChange={handleChange}
          >
            <option value={1}>Harian</option>
            <option value={2}>Mingguan</option>
            <option value={3}>Bulanan</option>
            <option value={4}>Tahunan</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Status Penghuni</label>
          <select
            className="form-select"
            name="status_penghuni"
            value={residentData.status_penghuni}
            onChange={handleChange}
          >
            <option value={1}>Belum Menikah</option>
            <option value={2}>Menikah</option>
            <option value={3}>Janda</option>
            <option value={4}>Duda</option>
            <option value={5}>Cerai Mati</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pekerjaan</label>
          <select
            className="form-select"
            name="pekerjaan"
            value={residentData.pekerjaan}
            onChange={handleChange}
          >
            <option value={1}>Mahasiswa</option>
            <option value={2}>Guru</option>
            <option value={3}>Dokter</option>
            <option value={4}>Karyawan</option>
            <option value={5}>Wiraswasta</option>
            <option value={6}>PNS</option>
            <option value={7}>Programmer</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Jumlah Penghuni</label>
          <input
            type="number"
            className="form-control"
            name="jumlah_penghuni"
            value={residentData.jumlah_penghuni}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lama Sewa </label>
          <input
            type="number"
            className="form-control"
            name="lama_sewa"
            value={residentData.lama_sewa}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tanggal Masuk</label>
          <input
            type="date"
            className="form-control"
            name="tanggal_masuk"
            value={residentData.tanggal_masuk}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Keterangan</label>
          <input
            type="text"
            className="form-control"
            name="keterangan"
            value={residentData.keterangan}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status Sewa</label>
          <select
            className="form-select"
            name="status_sewa"
            value={residentData.status_sewa}
            onChange={handleChange}
          >
            <option value={1}>Aktif</option>
            <option value={2}>Nonaktif</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditResidentPage;
