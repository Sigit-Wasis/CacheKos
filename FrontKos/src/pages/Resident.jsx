import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ResidentPage = () => {
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

        setResidents(response.data.data);
        setFilteredResidents(response.data.data); // Set initial filtered data
      } catch (error) {
        console.error("Error fetching residents:", error);
        setError("Failed to fetch residents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [navigate]);

  // Fungsi untuk menangani perubahan teks pencarian
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    // Filter data residents berdasarkan teks pencarian
    const filteredData = residents.filter(resident =>
      resident.nama_penghuni.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredResidents(filteredData);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://127.0.0.1:8000/api/residents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResidents(residents.filter((resident) => resident.id !== id));
      setFilteredResidents(filteredResidents.filter((resident) => resident.id !== id));
    } catch (error) {
      console.error("Error deleting resident:", error);
      setError("Failed to delete resident. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Residents</h1>
      <Link to="/add" className="btn btn-primary mb-4">Add New Resident</Link>
      <div className="mb-3">
        <input 
          type="text"
          className="form-control"
          placeholder="Search residents by name"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row">
        {filteredResidents.length > 0 ? (
          filteredResidents.map((resident) => (
            <div className="col-md-4 mb-4" key={resident.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{resident.nama_penghuni}</h5>
                  <p className="card-text"><strong>Id Kamar:</strong> {resident.id_kamar}</p>
                  <p className="card-text"><strong>No_Handphone:</strong> {resident.no_handphone}</p>
                  <p className="card-text"><strong>Gender:</strong> {resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</p>
                  <p className="card-text"><strong>No_KTP:</strong> {resident.no_ktp}</p>
                  <p className="card-text">
                    <strong>Jenis Kamar:</strong> {
                      (() => {
                        switch (resident.jenis_sewa_kamar) {
                          case 1: return 'Harian';
                          case 2: return 'Mingguan';
                          case 3: return 'Bulanan';
                          case 4: return 'Tahunan';
                          default: return 'Lainnya';
                        }
                      })()
                    }
                  </p>
                  <p className="card-text">
                    <strong>Status Penghuni:</strong> {
                      (() => {
                        switch (resident.status_penghuni) {
                          case 1: return 'Belum Menikah';
                          case 2: return 'Menikah';
                          case 3: return 'Janda';
                          case 4: return 'Duda';
                          case 5: return 'Cerai Mati';
                          default: return 'Lainnya';
                        }
                      })()
                    }
                  </p>
                  <p className="card-text">
                    <strong>Pekerjaan:</strong> {
                      (() => {
                        switch (resident.pekerjaan) {
                          case 1: return 'Mahasiswa';
                          case 2: return 'Guru';
                          case 3: return 'Dokter';
                          case 4: return 'Karyawan';
                          case 5: return 'Wiraswasta';
                          case 6: return 'PNS';
                          default: return 'Lainnya';
                        }
                      })()
                    }
                  </p>
                  <p className="card-text"><strong>Jumlah Penghuni:</strong> {resident.jumlah_penghuni}</p>
                  <p className="card-text"><strong>Lama Sewa:</strong> {resident.lama_sewa}</p>
                  <p className="card-text"><strong>Tanggal Masuk:</strong> {resident.tanggal_masuk}</p>
                  <p className="card-text"><strong>Keterangan:</strong> {resident.keterangan}</p>
                  <p className="card-text">
                    <strong>Status Sewa:</strong> {
                      (() => {
                        switch (resident.status_sewa) {
                          case 1: return 'Aktif';
                          case 2: return 'Nonaktif';
                          default: return 'Tidak Diketahui';
                        }
                      })()
                    }
                  </p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated on {new Date().toLocaleDateString()}</small>
                  <button 
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => handleDelete(resident.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No residents found</p>
        )}
      </div>
    </div>
  );
};

export default ResidentPage;
