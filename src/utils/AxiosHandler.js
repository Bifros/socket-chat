import { authAlias, axiosConfig } from './axios.config';
import store from './store';

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

  post(url, opts) {
    return axiosConfig.post(url, { data: opts });
  }
}