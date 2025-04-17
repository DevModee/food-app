import axios from 'axios';

const api = 'https://ts-food-weight-api.onrender.com/api';

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${api}/auth/login`, { email, password });
  return res.data;
}

export const register = async (email: string, password: string) => {
  const res = await axios.post(`${api}/auth/register`, { email, password });
  return res.data;
}

export default api;
