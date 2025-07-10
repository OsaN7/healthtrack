import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  const handleLogin = (token) => setToken(token);
  const handleLogout = () => setToken('');

  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
