// EditResidentPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditResidentPage = () => {
  const { id } = useParams(); // Get the resident ID from URL parameters
  const [resident, setResident] = useState({
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
  const navigate = useNavigate();

  // Fetch available rooms and resident data by ID
  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchResidentData = async () => {
      try {
        const roomResponse = await axios.get('http://127.0.0.1:8000/api/rooms', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(roomResponse.data.data); // Set available rooms

        const residentResponse = await axios.get(`http://127.0.0.1:8000/api/residents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResident(residentResponse.data.data); // Set resident data
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidentData();
  }, [id]);

  // Handle changes to input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Adjust 'lama_sewa' based on 'jenis_sewa_kamar'
    if (name === 'jenis_sewa_kamar') {
      let lamaSewaDefault = '';
      switch (value) {
        case '1':
          lamaSewaDefault = '1';
          break;
        case '2':
          lamaSewaDefault = '7';
          break;
        case '3':
          lamaSewaDefault = '30';
          break;
        case '4':
          lamaSewaDefault = '365';
          break;
        default:
          lamaSewaDefault = '';
      }
      setResident({ ...resident, [name]: value, lama_sewa: lamaSewaDefault });
    } else {
      setResident({ ...resident, [name]: value });
    }
  };

  // Save edited data
  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.put(`http://127.0.0.1:8000/api/residents/${id}`, resident, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/resident'); // Redirect to the resident page after saving
    } catch (error) {
      setError("Failed to save resident data. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit Resident</h1>
      {resident && (
        <div>
          {/* Name Input */}
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              name="nama_penghuni"
              className="form-control"
              value={resident.nama_penghuni}
              onChange={handleInputChange}
            />
          </div>

          {/* Room ID Select */}
          <div className="mb-3">
            <label>Room:</label>
            <select
              name="id_kamar"
              className="form-control"
              value={resident.id_kamar}
              onChange={handleInputChange}
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.nama_kamar}
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number Input */}
          <div className="mb-3">
            <label>Phone Number:</label>
            <input
              type="text"
              name="no_handphone"
              className="form-control"
              value={resident.no_handphone}
              onChange={handleInputChange}
            />
          </div>

          {/* Gender Select */}
          <div className="mb-3">
            <label>Gender:</label>
            <select
              name="jenis_kelamin"
              className="form-control"
              value={resident.jenis_kelamin}
              onChange={handleInputChange}
            >
              <option value={1}>Pria</option>
              <option value={2}>Wanita</option>
            </select>
          </div>

          {/* ID Card Number Input */}
          <div className="mb-3">
            <label>ID Card Number:</label>
            <input
              type="text"
              name="no_ktp"
              className="form-control"
              value={resident.no_ktp}
              onChange={handleInputChange}
            />
          </div>

          {/* Room Rental Type Select */}
          <div className="mb-3">
            <label>jenis Kamar Sewa:</label>
            <select
              name="jenis_sewa_kamar"
              className="form-control"
              value={resident.jenis_sewa_kamar}
              onChange={handleInputChange}
            >
              <option value="1">Harian</option>
              <option value="2">Mingguan</option>
              <option value="3">Bulanan</option>
              <option value="4">Tahunan</option>
            </select>
          </div>

          {/* Resident Status Select */}
          <div className="mb-3">
            <label>Status Penghuni :</label>
            <select
              name="status_penghuni"
              className="form-control"
              value={resident.status_penghuni}
              onChange={handleInputChange}
            >
              <option value={1}>Belum Menikah</option>
              <option value={2}>Menikah</option>
              <option value={3}>Janda</option>
              <option value={4}>Duda</option>
              <option value={5}>Cerai Mati</option>
            </select>
          </div>

          {/* Occupation Select */}
          <div className="mb-3">
            <label>Pekerjaan:</label>
            <select
              name="pekerjaan"
              className="form-control"
              value={resident.pekerjaan}
              onChange={handleInputChange}
            >
              <option value={1}>Mahasiswa</option>
              <option value={2}>Guru</option>
              <option value={3}>Dokter</option>
              <option value={4}>Karyawan</option>
              <option value={5}>Wiraswasta</option>
              <option value={6}>PNS</option>
            </select>
          </div>

          {/* Number of Residents Input */}
          <div className="mb-3">
            <label>Jumlah Penghuni:</label>
            <input
              type="number"
              name="jumlah_penghuni"
              className="form-control"
              value={resident.jumlah_penghuni}
              onChange={handleInputChange}
            />
          </div>

          {/* Lease Duration Input */}
          <div className="mb-3">
            <label>Lama Sewa:</label>
            <input
              type="text"
              name="lama_sewa"
              className="form-control"
              value={resident.lama_sewa}
              onChange={handleInputChange}
            />
          </div>

          {/* Entry Date Input */}
          <div className="mb-3">
            <label>Tanggal Masuk:</label>
            <input
              type="date"
              name="tanggal_masuk"
              className="form-control"
              value={resident.tanggal_masuk}
              onChange={handleInputChange}
            />
          </div>

          {/* Remarks Input */}
          <div className="mb-3">
            <label>Keterangan:</label>
            <textarea
              name="keterangan"
              className="form-control"
              value={resident.keterangan}
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Lease Status Select */}
          <div className="mb-3">
            <label>Status Sewa:</label>
            <select
              name="status_sewa"
              className="form-control"
              value={resident.status_sewa}
              onChange={handleInputChange}
            >
              <option value={1}>Aktif</option>
              <option value={2}>Nonaktif</option>
            </select>
          </div>

          {/* Save and Cancel buttons */}
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn btn-secondary ms-2" onClick={() => navigate('/resident')}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditResidentPage;