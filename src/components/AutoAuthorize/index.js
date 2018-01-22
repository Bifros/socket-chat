import React, { Component } from 'react';
import { history } from '../../store';
import OctoLoader from '../Common/Loader';
import AxiosHandler from '../../utils/AxiosHandler';
import errorMessages from '../../constants/errorMessages';
import {routes} from '../../constants/path';

class AutoAuthorize extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayLoader: true,
      displayError: false,
    }
  }

  componentWillMount() {
    this.authorize();
  }

  redirectIfUnAuthorized(res) {
    console.log(res);
    if (res.data.error) {
      history.push(routes.login);
    } else {
      this.setState({ displayLoader: false });
    }
  }

  static handleNetworkError() {
    history.push({
      pathname: routes.error,
      state: {
        message: errorMessages.SERVICE_UNAVALIABLE,
      }
    });
  }

  authorize() {
    const axiosHandler = new AxiosHandler();
    console.log(routes.authorizeUser);
    return axiosHandler
      .tokenSetup()
      .get(routes.userAuthorize)
      .then(this.redirectIfUnAuthorized)
      .catch(this.handleNetworkError);
  }

  render() {
    return this.state.displayLoader
      ? <OctoLoader />
      : (
        <div>
          {this.props.children}
        </div>
      );
  }
}

export default AutoAuthorize;