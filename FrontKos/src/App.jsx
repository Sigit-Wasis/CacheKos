import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, Link,  useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import User from "./pages/User";
// import Resident from "./pages/Resident"; // Tetap dikomentar

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
    const navigate=useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        // navigate("/home");
      }
    }, [navigate]);
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import Setting from "./pages/Setting";
import Payment from "./pages/Payment";
import Resident from "./pages/Resident";
import AddResidentPage from "./pages/AddResidentPage";
import InactiveResidentsPage from "./pages/InactiveResidentsPage";
import ActiveResident from "./pages/ActiveResidents";
import EditResidentPage from "./pages/EditResidentPage";
import PrintInvoicePage from "./pages/PrintInvoicePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [navigate]);
>>>>>>> 9a8568605d227926f8aa006cd853d92e641d37e7

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div>
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
<<<<<<< HEAD
=======

>>>>>>> 9a8568605d227926f8aa006cd853d92e641d37e7
              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/room">
                      Room
                    </Link>
                  </li>
                  <li className="nav-item">
<<<<<<< HEAD
                    {/* Bagian Resident dikomentar */}
                    {/* <Link className="nav-link" to="/resident">
                      Resident
                    </Link> */}
                  </li>
=======
                    <Link className="nav-link" to="/setting">
                      Setting
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/payment">
                      Payment
                    </Link>
                  </li>

                  {/* dropdown resident  */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Penghuni
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="/resident">
                          Penghuni
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/active">
                          Penghuni Aktif
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/inactive">
                          Penghuni Selesai
                        </Link>
                      </li>
                    </ul>
                  </li>

>>>>>>> 9a8568605d227926f8aa006cd853d92e641d37e7
                  <li className="nav-item">
                    <Link className="nav-link" to="/user">
                      User
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/" element={<HomePage />} />
<<<<<<< HEAD
        <Route path="/user" element={isAuthenticated ? <User /> : <LoginPage />} />
        {isAuthenticated && <Route path="/room" element={<Room />} />}
        {/* Rute Resident tetap dikomentar */}
        {/* {isAuthenticated && <Route path="/resident" element={<Resident />} />} */}
=======
        <Route path="/home" element={<HomePage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/payment" element={<Payment />} />
        {isAuthenticated && <Route path="/room" element={<Room />} />}
        {isAuthenticated && <Route path="/resident" element={<Resident/>} />}
        {isAuthenticated && <Route path="/add" element={<AddResidentPage/>} />}
        {isAuthenticated && <Route path="/inactive" element={<InactiveResidentsPage/>} />}
        {isAuthenticated && <Route path="/active" element={<ActiveResident/>} />}
        {isAuthenticated && <Route path="/edit/:id" element={<EditResidentPage/>} />}
        {isAuthenticated && <Route path="/invoice/:id" element={<PrintInvoicePage/>} />}
>>>>>>> 9a8568605d227926f8aa006cd853d92e641d37e7
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
