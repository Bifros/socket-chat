import axios from 'axios';

export const authAlias = 'Bearer ';

export const axiosConfig = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json',
  validateStatus: (status) => status < 500
});
