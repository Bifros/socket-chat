import AxiosHandler from '../../utils/AxiosHandler';
import { routes } from '../../constants/path';
import { history } from '../../store';

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

const obtainData = res => res.data ? res.data : null;

const handleErrors = res => {
  const error = res.data.error;

  if (error) {
    history.push({
      pathname: routes.error,
      state: {
        message: error,
      }
    })
  }

  return res;
};

export const handleSubmit = props => event => {
  event.preventDefault();

  if (props.valid === true) {
    const axiosHandler = new AxiosHandler();
    const { name, password } = props.values;

    axiosHandler
      .post(routes.userAthenticate, { name, password })
      .then(handleErrors)
      .then(obtainData)
  }
};
