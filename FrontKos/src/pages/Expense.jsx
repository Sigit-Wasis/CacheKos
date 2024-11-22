import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
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
      })
      .catch((error) => {
        setError("Gagal mengambil data pengeluaran. Silakan coba lagi.");
        console.error(error);
      });
  }, []);

  const handleAddExpense = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:8000/api/expenses", newExpense, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses([...expenses, response.data.expense]);
        setNewExpense({
          nama_pengeluaran: "",
          keterangan: "",
          nominal: "",
          tanggal: "",
        });
        setShowModal(false);
        setSuccessMessage("Pengeluaran berhasil ditambahkan!");
        window.location.reload();
      })
      .catch((error) => {
        setError("Gagal menambah pengeluaran.");
      });
  };

  const handleEditExpense = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:8000/api/expenses/${editExpense.id}`,
        editExpense,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editExpense.id ? response.data.data : expense
        );
        setExpenses(updatedExpenses);
        setEditExpense(null);
        setSuccessMessage("Pengeluaran berhasil diperbarui!");
        window.location.reload();
      })
      .catch((error) => {
        setError("Gagal memperbarui pengeluaran.");
      });
  };

  const handleDeleteExpense = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:8000/api/expenses/${expenseToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setExpenses(expenses.filter((expense) => expense.id !== expenseToDelete.id));
        setShowDeleteModal(false);
        setSuccessMessage("Pengeluaran berhasil dihapus!");
        window.location.reload();
      })
      .catch((error) => {
        setError("Gagal menghapus pengeluaran.");
      });
  };

  const modalStyles = {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const buttonContainerStyles = {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  };

  const deleteModalStyles = {
    padding: "30px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={{ margin: "20px auto", maxWidth: "1200px" }}>
      <h2 className="text-center mt-5">Daftar Pengeluaran</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content" style={modalStyles}>
            <h3>{editExpense ? "Edit Pengeluaran" : "Tambah Pengeluaran"}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editExpense) {
                  handleEditExpense();
                } else {
                  handleAddExpense();
                }
              }}
              style={formStyles}
            >
              <input
                type="text"
                placeholder="Nama Pengeluaran"
                value={editExpense ? editExpense.nama_pengeluaran : newExpense.nama_pengeluaran}
                onChange={(e) =>
                  editExpense
                    ? setEditExpense({ ...editExpense, nama_pengeluaran: e.target.value })
                    : setNewExpense({ ...newExpense, nama_pengeluaran: e.target.value })
                }
              />
              <input
                type="text"
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
                placeholder="Nominal"
                value={editExpense ? editExpense.nominal : newExpense.nominal}
                onChange={(e) =>
                  editExpense
                    ? setEditExpense({ ...editExpense, nominal: e.target.value })
                    : setNewExpense({ ...newExpense, nominal: e.target.value })
                }
              />
              <input
                type="date"
                value={editExpense ? editExpense.tanggal : newExpense.tanggal}
                onChange={(e) =>
                  editExpense
                    ? setEditExpense({ ...editExpense, tanggal: e.target.value })
                    : setNewExpense({ ...newExpense, tanggal: e.target.value })
                }
              />
              <div style={buttonContainerStyles}>
                <button type="submit">{editExpense ? "Perbarui" : "Tambah"}</button>
                <button type="button" onClick={() => setShowModal(false)}>Tutup</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-content" style={deleteModalStyles}>
            <h3 style={{ textAlign: "center" }}>Konfirmasi Penghapusan</h3>
            <p style={{ textAlign: "center" }}>Apakah kamu yakin ingin menghapus pengeluaran ini?</p>
            <div style={buttonContainerStyles}>
              <button
                onClick={handleDeleteExpense}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Ya, Hapus
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  backgroundColor: "#95a5a6",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 15px",
          marginBottom: "20px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Tambah Pengeluaran
      </button>

      {/* Tabel Daftar Pengeluaran */}
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>Nama Pengeluaran</th>
            <th>Keterangan</th>
            <th>Nominal</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.nama_pengeluaran}</td>
              <td>{expense.keterangan}</td>
              <td>Rp. {expense.nominal.toLocaleString()}</td>
              <td>{new Date(expense.tanggal).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => {
                    setEditExpense(expense);
                    setShowModal(true);
                  }}
                  style={{ backgroundColor: "#f39c12", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setExpenseToDelete(expense);
                    setShowDeleteModal(true);
                  }}
                  style={{ backgroundColor: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", marginLeft: "10px" }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expense;
