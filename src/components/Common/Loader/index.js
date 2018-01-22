import React from 'react';
import {
  LoaderWrapper,
  OctoSpinner
} from './style';
import loader from '../../../assets/img/octo-loader.gif';

const OctoLoader = () => (
  <LoaderWrapper>
    <OctoSpinner src={loader} className='loader' alt="Super Octo Loader"/>
  </LoaderWrapper>
);

export default OctoLoader;