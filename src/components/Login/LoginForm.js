import React from 'react';
import {Field, getFormValues, reduxForm} from 'redux-form';
import { validate, handleSubmit } from './form-helpers';
import {
  LoginInput,
  Form,
  SubmitBtn,
  RegisterBtn,
  ErrorBox,
  MiddleWord
} from './style';
import {connect} from 'react-redux';

const userNameCmp = ({ input }) => <LoginInput
  {...input}
  placeholder="Full name"
  type="text"
/>;

const userPassCmp = ({ input }) => <LoginInput
  {...input}
  placeholder="Password"
  type="password"
/>;

const LoginForm = props => (
  <Form onSubmit={handleSubmit(props)}>
    <Field
      component={userNameCmp}
      name="name"
    />
    <Field
      component={userPassCmp}
      name="password"
    />
    <ErrorBox>{props.error}</ErrorBox>
    <SubmitBtn type="submit">LOGIN</SubmitBtn>
    <MiddleWord>OR</MiddleWord>
    <RegisterBtn>REGISTER</RegisterBtn>
  </Form>
);

export default reduxForm({
  form: 'login',
  validate,
})(connect(state => ({
  values: getFormValues('login')(state)
}), null)(LoginForm));