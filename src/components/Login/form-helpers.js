import AxiosHandler from '../../utils/AxiosHandler';
import { appRoutes, apiEndpoints } from '../../constants/path';
import { history } from '../../store';
import storage from '../../utils/storage';

export const validate = values => {
  const errors = {};

  if (!values.name) {
    errors._error = '"Name" is required';
  } else if (values.name.length < 3) {
    errors._error = '"Name" Must be at least 3 characters';
  } else if (values.name.length > 50) {
    errors._error = '"Name" Must be less than 50 characters';
  } else if (!values.password) {
    errors._error = '"Password" Required'
  } else if (values.password.length < 6) {
    errors._error = '"Password" should be at least 6 characters'
  } else
    errors._error = '';

  return errors;
};

const saveInfo = data => {
  if (data) {
    const {
      name,
      access_token,
      refresh_token,
    } = data;

    storage.setToken('access', access_token);
    storage.setToken('refresh', refresh_token);
    storage.setUser(name);
  } else {
    throw new Error('No data');
  }

  return data;
};

const handleErrors = err => console.log(err);

const handleResponse = res => {
  const error = res.data.error;

  return !error
    ? res.data
    : history.push({
      pathname: appRoutes.error,
      state: {
        message: error,
      }
    });
};

const navigateToLobby = (info) => history
  .push({
    pathname: appRoutes.lobby,
    state: {
      userInfo: info
    }
  });

export const handleSubmit = props => event => {
  event.preventDefault();

  if (props.valid === true) {
    const axiosHandler = new AxiosHandler();
    const { name, password } = props.values;

    axiosHandler
      .post(apiEndpoints.userAthenticate, { name, password })
      .then(handleResponse)
      .then(saveInfo)
      .then(navigateToLobby)
      .catch(handleErrors)
  }
};
