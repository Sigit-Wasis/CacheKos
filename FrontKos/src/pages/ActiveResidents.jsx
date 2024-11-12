import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ActiveResidents.css';

const ActiveResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

        const inactiveResidents = response.data.data.filter(
          (resident) => resident.status_sewa === 1
        );

        setResidents(inactiveResidents);
      } catch (error) {
        console.error("Error fetching residents:", error);
        setError("Failed to fetch residents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [navigate]);

  const filteredResidents = residents.filter((resident) =>
    resident.nama_penghuni.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="active-residents-container">
      <h1 className="title">Penghuni Aktif</h1>

      <input
        type="text"
        placeholder="Cari Nama Penghuni"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="residents-table">
        <thead>
          <tr>
            
            <th>Data Penghuni</th>
            <th>Tanggal</th>
            <th>Harga</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {filteredResidents.map((resident) => (
            <tr key={resident.id}>
              <td>
                <p><strong>Nama:</strong> {resident.nama_penghuni}</p>
                <p><strong>Kelamin:</strong> {resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</p>
                <p><strong>No. HP:</strong> {resident.no_handphone}</p>
                <p><strong>Jenis Kamar:</strong> {getStatusSewa(resident.jenis_sewa_kamar)}</p>
                <p><strong>Status Penghuni:</strong> {getStatusPenghuni(resident.status_penghuni)}</p>
                <p><strong>Pekerjaan:</strong> {getPekerjaan(resident.pekerjaan)}</p>
                <p><strong>Penghuni:</strong> {resident.jumlah_penghuni} Orang</p>
                <p><strong>Status Sewa:</strong> {resident.status_sewa === 1 ? 'Aktif' : 'Nonaktif'}</p>
              </td>
              <td>
                <p><strong>Masuk:</strong> {resident.tanggal_masuk}</p>
                <p><strong>Perpanjang:</strong> {resident.tanggal_perpanjang}</p>
                <p className={resident.status_sewa === 2 ? "expired" : ""}><strong>Habis:</strong> {resident.tanggal_habis}</p>
              </td>
              <td>
                <p><strong>Harga Kamar:</strong> Rp. {resident.harga_kamar}</p>
                <p><strong>Tambah 1 Penghuni:</strong> Rp. {resident.harga_tambahan}</p>
                <p><strong>Lama Sewa:</strong> {resident.lama_sewa} Bulan</p>
                <p><strong>Total:</strong> Rp. {resident.total}</p>
                <p><strong>Status Pembayaran:</strong> <span className="payment-status">Lunas</span></p>
              </td>
              <td>
                {resident.status_sewa === 2 ? (
                  <p className="expired-text">Masa Sewa Telah Habis! Lewat {resident.hari_terlambat} hari<br/>Denda Rp. {resident.denda}</p>
                ) : (
                  <p className="on-time">[Lunas]</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper functions to get status labels
const getStatusPenghuni = (status) => {
  switch (status) {
    case 1: return 'Belum Menikah';
    case 2: return 'Menikah';
    case 3: return 'Janda';
    case 4: return 'Duda';
    case 5: return 'Cerai Mati';
    default: return 'Lainnya';
  }
};

const getStatusSewa = (status) => {
  switch (status) {
    case 1: return 'Harian';
    case 2: return 'Mingguan';
    case 3: return 'Bulanan';
    case 4: return 'Tahunan';
    default: return 'Lainnya';
  }
};

const getPekerjaan = (job) => {
  switch (job) {
    case 1: return 'Mahasiswa';
    case 2: return 'Guru';
    case 3: return 'Dokter';
    case 4: return 'Karyawan';
    case 5: return 'Wiraswasta';
    case 6: return 'PNS';
    default: return 'Lainnya';
  }
};

export default ActiveResidents;
