import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Impor useNavigate dari react-router-dom
import Swal from 'sweetalert2';
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(""); // Reset error setiap kali login

    try {
      // Kirim permintaan login ke backend Laravel
      const response = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });

      // Cek apakah respons berhasil
      if (response.data.message === "Login berhasil") {
        localStorage.setItem("token", response.data.data.access_token); // Simpan token ke localStorage
        Swal.fire({
          title: 'Sukses!',
          text: 'Login berhasil!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/dashboard"); // Navigasi ke halaman dashboard setelah user klik "OK"
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Login gagal, periksa kembali data Anda.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (err) {
      // Tangani error dari server atau permintaan
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada server. Silakan coba lagi.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center mt-5">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
