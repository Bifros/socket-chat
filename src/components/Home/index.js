import React, { Component } from 'react';
import HomeCmp from './HomeComponent';
import AutoAuthorize from '../AutoAuthorize';

class Home extends Component {
  render() {
    return (
      <AutoAuthorize>
        <HomeCmp />
      </AutoAuthorize>
    );
  }
}

export default Home;