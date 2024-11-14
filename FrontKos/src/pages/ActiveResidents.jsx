import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Resident.css';

const ActiveResidentPage = () => {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
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

        // Filter active residents where status_sewa is 'Aktif' (1)
        const activeResidents = response.data.data.filter(
          (resident) => resident.status_sewa === 1
        );

        setResidents(activeResidents);
        setFilteredResidents(activeResidents);
      } catch (error) {
        console.error('Error fetching residents:', error);
        setError('Failed to fetch residents. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [navigate]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const filteredData = residents.filter((resident) =>
      resident.nama_penghuni.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResidents(filteredData);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    
    const confirmDelete = window.confirm('Are you sure you want to delete this resident?');
    
    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/residents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResidents(residents.filter((resident) => resident.id !== id));
      setFilteredResidents(filteredResidents.filter((resident) => resident.id !== id));
    } catch (error) {
      console.error('Error deleting resident:', error);
      setError('Failed to delete resident. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <h1 className="mb-4"><Skeleton width={200} /></h1>
        <div className="mb-3">
          <Skeleton height={40} />
        </div>
        <div className="row">
          {Array(6).fill().map((_, index) => (
            <div className="col-md-4 col-sm-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title"><Skeleton width={`100%`} /></h5>
                  <p className="card-text"><Skeleton count={7} /></p>
                </div>
                <div className="card-footer">
                  <Skeleton width={`60%`} />
                  <Skeleton height={30} width={`20%`} className="float-end" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Penghuni Aktif</h1>
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search active residents by name"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredResidents.length > 0 ? (
          filteredResidents.map((resident) => (
            <div className="col-md-4 col-sm-6 mb-4" key={resident.id}>
              <div className="card h-100">
                <div className="card-body d-flex align-items-center">
                  <img 
                    src={resident.profile_picture || '/default-profile.png'}
                    alt="Profile" 
                    className="profile-img"
                  />
                  <div className="ms-3">
                    <h5 className="card-title">{resident.nama_penghuni}</h5>
                    <small className="text-muted">Last updated on {new Date().toLocaleDateString()}</small>
                  </div>
                </div>
                <table className="table table-borderless resident-table">
                  <tbody>
                    <tr>
                      <td>Id Kamar</td>
                      <td><strong>{resident.id_kamar}</strong></td>
                    </tr>
                    <tr>
                      <td>No Handphone</td>
                      <td><strong>{resident.no_handphone}</strong></td>
                    </tr>
                    <tr>
                      <td>Gender</td>
                      <td><strong>{resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</strong></td>
                    </tr>
                    <tr>
                      <td>No KTP</td>
                      <td><strong>{resident.no_ktp}</strong></td>
                    </tr>
                    <tr>
                      <td>Jenis Sewa</td>
                      <td><strong>{["Harian", "Mingguan", "Bulanan", "Tahunan"][resident.jenis_sewa_kamar - 1] || "Lainnya"}</strong></td>
                    </tr>
                    <tr>
                      <td>Status Penghuni</td>
                      <td><strong>{["Belum Menikah", "Menikah", "Janda", "Duda", "Cerai Mati"][resident.status_penghuni - 1] || "Lainnya"}</strong></td>
                    </tr>
                    <tr>
                      <td>Pekerjaan</td>
                      <td><strong>{["Mahasiswa", "Guru", "Dokter", "Karyawan", "Wiraswasta", "PNS", "Programmer"][resident.pekerjaan - 1] || "Lainnya"}</strong></td>
                    </tr>
                    <tr>
                      <td>Jumlah Penghuni</td>
                      <td><strong>{resident.jumlah_penghuni} Orang</strong></td>
                    </tr>
                    <tr>
                      <td>Lama Sewa</td>
                      <td><strong>{`${resident.lama_sewa} ${["Hari", "Minggu", "Bulan", "Tahun"][resident.jenis_sewa_kamar - 1] || "Lainnya"}`}</strong></td>
                    </tr>
                    <tr>
                      <td>Tanggal Masuk</td>
                      <td><strong>{resident.tanggal_masuk}</strong></td>
                    </tr>
                    <tr>
                      <td>Keterangan</td>
                      <td><strong>{resident.keterangan}</strong></td>
                    </tr>
                    <tr>
                      <td>Status Sewa</td>
                      <td><strong>{resident.status_sewa === 1 ? 'Aktif' : 'Nonaktif'}</strong></td>
                    </tr>
                  </tbody>
                </table>
                <div className="card-footer d-flex justify-content-between">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/invoice/${resident.id}`)}
                  >
                    Print Invoice
                  </button>
                  <button 
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate(`/edit/${resident.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(resident.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No active residents found</p>
        )}
      </div>
    </div>
  );
};

export default ActiveResidentPage;
