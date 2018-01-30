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

  downloadFile(url, opts) {
    this.axiosConfig
      .defaults
      .responseType = 'blob';

    return this
      .post(url, opts);
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