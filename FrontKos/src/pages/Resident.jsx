import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResidentPage = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/residents', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Akses data di dalam respons API
        setResidents(response.data.data);
      } catch (error) {
        console.error("Error fetching residents:", error);
        setError("Failed to fetch residents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [navigate]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
    <h1 className="mb-4">Residents</h1>
    <div className="row">
      {residents.map((resident) => (
        <div className="col-md-4 mb-4" key={resident.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{resident.nama_penghuni}</h5>
              <p className="card-text"><strong>Id Kamar:</strong> {resident.id_kamar}</p>
              <p className="card-text"><strong>No_Handphone:</strong> {resident.no_handphone}</p>
              <p className="card-text"><strong>Gender:</strong> {resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</p>
              <p className="card-text"><strong>No_KTP:</strong> {resident.no_ktp}</p>
              <p className="card-text"><strong>Jenis Kamar:</strong> {resident.jenis_sewa_kamar === 1 ? 'Harian' : 'Mingguan'}</p>
              <p className="card-text"><strong>Status:</strong> {resident.status_penghuni === 1 ? 'Active' : 'Inactive'}</p>
              <p className="card-text"><strong>Pekerjaan:</strong> {resident.pekerjaan}</p>
              <p className="card-text"><strong>Jumlah Penghuni:</strong> {resident.jumlah_penghuni}</p>
              <p className="card-text"><strong>Lama Sewa:</strong> {resident.lama_sewa}</p>
              <p className="card-text"><strong>Tanggal Masuk:</strong> {resident.tanggal_masuk}</p>
              <p className="card-text"><strong>keterangan:</strong> {resident.keterangan}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated on {new Date().toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default ResidentPage;
