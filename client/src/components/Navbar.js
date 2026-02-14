
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">💰 PennyWise</Link>
        {isAuthenticated ? (
          <div className="nav-menu">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <span className="user-name">👤 {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="nav-menu">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
