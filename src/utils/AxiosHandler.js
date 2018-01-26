import { authAlias, axiosConfig } from './axios.config';
import store from './storage';

export default class AxiosHandler {
  constructor() {
    this.axiosConfig = axiosConfig;
  }

  tokenSetup() {
    this.axiosConfig
      .defaults
      .headers
      .authorization = authAlias + store.getToken('access');

    return this.axiosConfig;
  }

  getChatConnection() {
    const chatConnection = axiosConfig;
    chatConnection
      .defaults
      .baseURL = 'http://localhost:8002';

    return chatConnection;
  }

  post(url, opts) {
    return this
      .tokenSetup()
      .post(url, opts);
  }

  get(url, opts) {
    return this
      .tokenSetup()
      .get(url, opts);
  }
}