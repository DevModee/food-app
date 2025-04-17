import axios from 'axios';

const api = 'https://ts-food-weight-api.onrender.com/api';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${api}/users/login`, { username, password });
  return res.data;
}

export const register = async (username: string, password: string) => {
  const res = await axios.post(`${api}/users/register`, { username, password });
  return res.data;
}

export default api;
