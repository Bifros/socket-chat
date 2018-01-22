import React from 'react';
import LoginForm from './LoginForm';
import {
  LoginWrapper,
  LoginFormContainer,
  FormTitle
} from './style';

const Login = () => (
  <LoginWrapper>
    <LoginFormContainer>
      <FormTitle>Login</FormTitle>
      <LoginForm />
    </LoginFormContainer>
  </LoginWrapper>
);

export default Login;
