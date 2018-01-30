import React, { Component } from 'react';
import OctoLoader from '../Common/Loader';
import AxiosHandler from '../../utils/AxiosHandler';
import { history } from '../../store';
import errorMessages from '../../constants/errorMessages';
import { apiEndpoints, appRoutes } from '../../constants/path';

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

  navigate(res) {
    if (res.data.error) {
      history.push(appRoutes.login);
    } else {
      this.setState({ displayLoader: false });
      history.push({
        pathname: appRoutes.lobby,
        state: {
          userInfo: {}
        }
      });
    }
  }

  handleNetworkError() {
      history.push({
        pathname: appRoutes.error,
        state: {
          message: errorMessages.SERVICE_UNAVAILABLE,
        }
      });
  }

  authorize() {
    const axiosHandler = new AxiosHandler();

    return axiosHandler
      .tokenSetup()
      .get(apiEndpoints.userAuthorize)
      .then(this.navigate.bind(this))
      .catch(this.handleNetworkError.bind(this));
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