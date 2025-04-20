import axios from 'axios';

const api = 'http://192.168.1.103:3000/api';

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${api}/users/login`, { username, password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error al iniciar sesión');
  }
}

export const register = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${api}/users/register`, { username, password });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || 'Error al registrar usuario');
  }
}

export const getWeightByDate = async (userId: number, startDate: string, endDate: string) => {
  try {
    const res = await axios.get(`/weights/${userId}?start=${startDate}&end=${endDate}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Error al obtener peso por fecha');
  }
}

export const addWeight = async (userId: number, value: number, date: string) => {
  try {
    const res = await axios.post(`${api}/weight`, {
      userId,
      value,
      date
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Error al agregar peso');
  }
}

export const updateWeight = async (id: number, value: number, date: string) => {
  try {
    const res = await axios.put(`${api}/weight/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Error al actualizar peso');
  }
}
