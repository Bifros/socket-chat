export const getToken = (type) => localStorage.getItem(`${type}_token`);
export const setToken = (type, token) => localStorage.setItem(`${type}_token`, token);

export default {
  getToken,
  setToken
};