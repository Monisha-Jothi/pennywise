import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const transactionAPI = {
  getAll: () => API.get('/transactions'),
  create: (data) => API.post('/transactions', data),
  delete: (id) => API.delete(`/transactions/${id}`),
};

export const statsAPI = {
  getStats: () => API.get('/stats'),
};

export default API;
