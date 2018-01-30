import React from 'react';
import {
  PageWrapper,
  ErrorTitle,
  Error,
  ErrorWrapper
} from './style';

const ErrorPage = ({ location }) => (
  <PageWrapper>
    <ErrorWrapper>
      <ErrorTitle>Error occurred</ErrorTitle>
      <Error>{location.state ? location.state.message : location.message }</Error>
    </ErrorWrapper>
  </PageWrapper>
);

export default ErrorPage;