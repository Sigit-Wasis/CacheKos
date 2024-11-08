import React, { useState, useEffect } from "react";
import axios from "axios";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Jika token tidak ada, tampilkan pesan error
    if (!token) {
      setError("Anda harus login untuk melihat daftar pengeluaran.");
      return;
    }

    // Ambil data expense dari API Laravel
    axios
      .get("http://localhost:8000/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenses(response.data.data); // Set data expenses ke state
      })
      .catch((error) => {
        setError("Gagal mengambil data pengeluaran. Silakan coba lagi.");
        console.error(error); // Log error di console
      });
  }, []);

  return (
    <div style={{ margin: "20px auto", maxWidth: "1200px" }}>
      <h2 className="text-center mt-5">Daftar Pengeluaran</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {expenses.map((expense) => (
          <div className="col-md-4" key={expense.id}>
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
                marginBottom: "20px",
              }}
              className="expense-card"
            >
              <div
                style={{
                  padding: "20px",
                }}
                className="expense-card-body"
              >
                <h5 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                  {expense.nama_pengeluaran}
                </h5>
                <h6
                  style={{
                    fontSize: "1rem",
                    color: "#6c757d",
                    marginBottom: "10px",
                  }}
                  className="expense-card-subtitle"
                >
                  Tanggal: {new Date(expense.tanggal).toLocaleDateString()}
                </h6>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#495057",
                  }}
                  className="expense-card-text"
                >
                  Jumlah: Rp {expense.jumlah.toLocaleString()} <br />
                  Kategori: {expense.kategori} <br />
                  Deskripsi: {expense.deskripsi} <br />
                  Catatan: {expense.catatan}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
