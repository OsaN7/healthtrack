import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; 
const api = axios.create({
  baseURL: API_URL,
});

// Auth
export const registerUser = (userData) => api.post('/auth/register', userData);

export const loginUser = (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  return api.post('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};

// Health endpoints (require auth token)
export const getHealthEntries = (token) =>
  api.get('/health/', { headers: { Authorization: `Bearer ${token}` } });

export const createHealthEntry = (token, entry) =>
  api.post('/health/', entry, { headers: { Authorization: `Bearer ${token}` } });

export const updateHealthEntry = (token, id, entry) =>
  api.put(`/health/${id}`, entry, { headers: { Authorization: `Bearer ${token}` } });

export const deleteHealthEntry = (token, id) =>
  api.delete(`/health/${id}`, { headers: { Authorization: `Bearer ${token}` } });
