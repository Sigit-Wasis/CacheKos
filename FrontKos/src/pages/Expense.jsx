import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [newExpense, setNewExpense] = useState({
    nama_pengeluaran: "",
    keterangan: "",
    nominal: "",
    tanggal: "",
  });
  const [editExpense, setEditExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch data from API on component mount
  const fetchExpenses = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Anda harus login untuk melihat daftar pengeluaran.");
      return;
    }

    axios
      .get("http://localhost:8000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data.data);
        setError("");
      })
      .catch((error) => {
        setError("Gagal mengambil data pengeluaran. Silakan coba lagi.");
        console.error(error);
      });
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = () => {
    const token = localStorage.getItem("token");

    if (!newExpense.nama_pengeluaran || !newExpense.nominal || !newExpense.tanggal) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    axios
      .post("http://localhost:8000/api/expenses", newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNewExpense({ nama_pengeluaran: "", keterangan: "", nominal: "", tanggal: "" });
        setShowModal(false);
        setSuccessMessage("Pengeluaran berhasil ditambahkan!");
        setError("");
        fetchExpenses(); // Refresh data
      })
      .catch((error) => {
        setError("Gagal menambah pengeluaran.");
        console.error(error);
      });
  };

  const handleUpdateExpense = () => {
    const token = localStorage.getItem("token");

    if (!editExpense.nama_pengeluaran || !editExpense.nominal || !editExpense.tanggal) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    axios
      .put(`http://localhost:8000/api/expenses/${editExpense.id}`, editExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setEditExpense(null);
        setShowModal(false);
        setSuccessMessage("Pengeluaran berhasil diperbarui!");
        setError("");
        fetchExpenses(); // Refresh data
      })
      .catch((error) => {
        setError("Gagal memperbarui pengeluaran.");
        console.error(error);
      });
  };

  const handleDeleteExpense = (id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengeluaran ini?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuccessMessage("Pengeluaran berhasil dihapus!");
        setError("");
        fetchExpenses(); // Refresh data
      })
      .catch((error) => {
        setError("Gagal menghapus pengeluaran.");
        console.error(error);
      });
  };

  const columns = [
    {
      name: "Nama Pengeluaran",
      selector: (row) => row.nama_pengeluaran,
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: (row) => row.keterangan,
      sortable: true,
    },
    {
      name: "Nominal",
      selector: (row) => `Rp. ${row.nominal.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => new Date(row.tanggal).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div>
          <button
            onClick={() => {
              setSelectedExpense(row);
              setShowDetailModal(true);
            }}
            className="btn btn-info me-2"
          >
            <FaEye />
          </button>
          <button
            onClick={() => {
              setEditExpense(row);
              setShowModal(true);
            }}
            className="btn btn-warning me-2"
          >
            <FaEdit />
          </button>
          <button onClick={() => handleDeleteExpense(row.id)} className="btn btn-danger">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filteredExpenses = expenses.filter((expense) =>
    expense.nama_pengeluaran.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Daftar Pengeluaran</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <input
        type="text"
        placeholder="Cari berdasarkan Nama Pengeluaran"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      <button
        onClick={() => {
          setNewExpense({ nama_pengeluaran: "", keterangan: "", nominal: "", tanggal: "" });
          setEditExpense(null);
          setShowModal(true);
        }}
        className="btn btn-primary mb-3"
      >
        Tambah Pengeluaran
      </button>

      <DataTable columns={columns} data={filteredExpenses} pagination highlightOnHover />

      {/* Modal Tambah/Edit Pengeluaran */}
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editExpense ? "Edit Pengeluaran" : "Tambah Pengeluaran"}
                </h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editExpense) handleUpdateExpense();
                    else handleAddExpense();
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Nama Pengeluaran"
                    value={editExpense ? editExpense.nama_pengeluaran : newExpense.nama_pengeluaran}
                    onChange={(e) =>
                      editExpense
                        ? setEditExpense({ ...editExpense, nama_pengeluaran: e.target.value })
                        : setNewExpense({ ...newExpense, nama_pengeluaran: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Keterangan"
                    value={editExpense ? editExpense.keterangan : newExpense.keterangan}
                    onChange={(e) =>
                      editExpense
                        ? setEditExpense({ ...editExpense, keterangan: e.target.value })
                        : setNewExpense({ ...newExpense, keterangan: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Nominal"
                    value={editExpense ? editExpense.nominal : newExpense.nominal}
                    onChange={(e) =>
                      editExpense
                        ? setEditExpense({ ...editExpense, nominal: e.target.value })
                        : setNewExpense({ ...newExpense, nominal: e.target.value })
                    }
                    required
                  />
                  <input
                    type="date"
                    className="form-control mb-3"
                    value={editExpense ? editExpense.tanggal : newExpense.tanggal}
                    onChange={(e) =>
                      editExpense
                        ? setEditExpense({ ...editExpense, tanggal: e.target.value })
                        : setNewExpense({ ...newExpense, tanggal: e.target.value })
                    }
                    required
                  />
                  <button type="submit" className="btn btn-success">
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Pengeluaran */}
      {showDetailModal && selectedExpense && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detail Pengeluaran</h5>
                <button className="btn-close" onClick={() => setShowDetailModal(false)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Nama Pengeluaran:</strong> {selectedExpense.nama_pengeluaran}</p>
                <p><strong>Keterangan:</strong> {selectedExpense.keterangan}</p>
                <p><strong>Nominal:</strong> Rp. {selectedExpense.nominal.toLocaleString()}</p>
                <p><strong>Tanggal:</strong> {new Date(selectedExpense.tanggal).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
