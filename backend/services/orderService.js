import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:3000/api/';

const getAuthHeader = () => {
  const authData = authService.getAuthData();
  if (authData && authData.token) {
    return { Authorization: 'Bearer ' + authData.token };
  } else {
    return {};
  }
};

const placeOrder = (orderData) => {
  return axios.post(API_URL + 'orders', orderData, { headers: getAuthHeader() });
};

const getMyOrders = () => {
  return axios.get(API_URL + 'my-orders', { headers: getAuthHeader() });
};

const orderService = {
  placeOrder,
  getMyOrders,
};

export default orderService;