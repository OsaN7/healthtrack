import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';
const api = axios.create({ baseURL: API_URL });

const handleError = (err) => {
  if (err.response?.data) {
    const data = err.response.data;
    if (Array.isArray(data)) {
      return data
        .map(e => (e.loc ? `${e.loc.slice(1).join('.')} - ${e.msg}` : e.msg || JSON.stringify(e)))
        .join(', ');
    }
    return data.detail || data.message || JSON.stringify(data);
  }
  return err.message || 'Network error';
};

// Register
export const registerUser = async ({ username, email, password }) => {
  try {
    const res = await api.post('/auth/register', { username, email, password });
    return res.data.access_token;   // ✅ only return token
  } catch (err) {
    throw new Error(handleError(err));
  }
};

// Login
export const loginUser = async (username, password) => {
  try {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const res = await api.post('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return res.data.access_token;   // ✅ only return token
  } catch (err) {
    throw new Error(handleError(err));
  }
};

// Health entries
export const getHealthEntries = async (token) => {
  const res = await api.get('/health/', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createHealthEntry = async (token, entry) => {
  const res = await api.post('/health/', entry, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteHealthEntry = async (token, id) => {
  const res = await api.delete(`/health/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
