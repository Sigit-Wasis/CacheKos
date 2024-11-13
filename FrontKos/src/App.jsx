import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";
import Setting from "./pages/Setting";
// import Payment from "./pages/Payment";
import Resident from "./pages/Resident";
import Expense from "./pages/Expense";
import AddResidentPage from "./pages/AddResidentPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [navigate]);

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
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="residentDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Resident
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="residentDropdown">
                      <li>
                        <Link className="dropdown-item" to="/resident">
                          Resident
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/inactiveresident">
                          Inactive Resident
                        </Link>
                      </li>
                    </ul>
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
                          Penghuni Aktif
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/selesai">
                          Penghuni Selesai
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-link"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/expense">
                      Expense
                    </Link>
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
        <Route path="/home" element={<HomePage />} />
        {isAuthenticated && <Route path="/room" element={<Room />} />}
        {isAuthenticated && <Route path="/resident" element={<Resident />} />}
        {isAuthenticated && <Route path="/add" element={<AddResidentPage />} />}
        <Route path="/setting" element={<Setting />} />
        {isAuthenticated && <Route path="/expense" element={<Expense />} />}
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
