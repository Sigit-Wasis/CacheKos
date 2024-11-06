import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link , useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Room from "./pages/Room";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // navigate("/home"); kalo dihidupkan tidak muncul navigasi room
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
                  <li className="nav-item">
                    <Link
                      className="nav-link btn btn-link"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
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
