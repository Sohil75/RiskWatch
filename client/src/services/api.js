import axios from 'axios';

const API_URL = 'https://riskwatch-backend.onrender.com';

// Auth Service
export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, {
    username,
    email,
    password
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password
  });
  return response.data;
};

// Fraud Detection Service
export const checkTransaction = async (transactionData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  const response = await axios.post(`${API_URL}/api/fraud/check`, transactionData, {
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const getTransactions = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/api/fraud/transactions/${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
