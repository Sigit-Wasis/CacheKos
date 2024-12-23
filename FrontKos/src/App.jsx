import React, { useState, useEffect } from "react";
import {BrowserRouter as Router,Route,Routes,Link,useNavigate,} from "react-router-dom";
import Register from "./components/Register/Register";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Fasilitas from "./components/Fasilitas/Fasilitas";
import Kamar from "./components/Kamar/Kamar";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Room from "./pages/Room";
import Setting from "./pages/Setting";
import Payment from "./pages/Payment";
import Resident from "./pages/Resident";
import Expense from "./pages/Expense";
import AddResidentPage from "./pages/AddResidentPage";
import InactiveResidentsPage from "./pages/InactiveResidentsPage";
import ActiveResident from "./pages/ActiveResidents";
import PrintInvoicePage from "./pages/PrintInvoicePage";
import EditResidentPage from "./pages/EditResidentPage";
import User from "./pages/User";
import Laporan from "./pages/Laporan";
import Dashboard from "./pages/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [navigate]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     navigate('/login'); // Jika tidak ada token, arahkan ke halaman login
  //   }
  // }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar hanya ditampilkan jika pengguna sudah login */}
      {isAuthenticated && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              CacheKos
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/room">
                    Room
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/setting">
                    Setting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/payment">
                    Payment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user">
                    User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/expense">
                    Expense
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/laporan">
                    Report
                  </Link>
                </li>

                {/* Dropdown for Resident */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Resident
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/resident">
                        Resident
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/active">
                      Resident Active
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/selesai">
                      Resident Inactive
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      
      {/* Routing */}
      <Routes>
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/fasilitas" element={<Fasilitas />} />
        <Route path="/kamar" element={<Kamar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />} />
        {isAuthenticated && <Route path="/room" element={<Room />} />}
        {isAuthenticated && <Route path="/setting" element={<Setting />} />}
        {isAuthenticated && <Route path="/payment" element={<Payment />} />}
        {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
        {isAuthenticated && <Route path="/expense" element={<Expense />} />}
        {isAuthenticated && <Route path="/laporan" element={<Laporan />} />}
        {isAuthenticated && <Route path="/resident" element={<Resident />} />}
        {isAuthenticated && <Route path="/add" element={<AddResidentPage />} />}
        {isAuthenticated && (
          <Route path="/selesai" element={<InactiveResidentsPage />} />
        )}
        {isAuthenticated && <Route path="/active" element={<ActiveResident />} />}
        {isAuthenticated && (
          <Route path="/edit/:id" element={<EditResidentPage />} />
        )}
        {isAuthenticated && (
          <Route path="/invoice/:id" element={<PrintInvoicePage />} />
        )}
        {isAuthenticated && <Route path="/user" element={<User />} />}
        {isAuthenticated && <Route path="/invoice/:id" element={<PrintInvoicePage />} />}
        
      </Routes>
    </div>
  );
}

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
