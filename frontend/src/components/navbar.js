import React from 'react';
import { Link } from 'react-router-dom';  // import Link from react-router-dom
import '../styles/App.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">HealthTrack</div>
      <ul className="navbar-links">
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
