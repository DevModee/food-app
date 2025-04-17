import axios from 'axios';

const api = 'http://192.168.1.103:3000/api';

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${api}/users/login`, { username, password });
  return res.data;
}

export const register = async (username: string, password: string) => {
  const res = await axios.post(`${api}/users/register`, { username, password });
  return res.data;
}
