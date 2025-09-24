import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

const register = (email, password) => {
  return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
  return axios.post(API_URL + 'login', { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('auth', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('auth');
};

const getAuthData = () => {
  return JSON.parse(localStorage.getItem('auth'));
};

const authService = {
  register,
  login,
  logout,
  getAuthData,
};

export default authService;