export const getToken = (type) => localStorage.getItem(`${type}_token`);
export const setToken = (type, token) => localStorage.setItem(`${type}_token`, token);
export const setUser = (name) => localStorage.setItem('user', name);
export const getUser = () => localStorage.getItem('user');

export default {
  getToken,
  setToken,
  setUser,
  getUser
};