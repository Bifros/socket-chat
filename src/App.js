import React, { Component } from 'react';
import axios from 'axios';
import {
  LoginContainer,
  LoginInput
} from './components/Login/style';
import LoginCmp from './components/Login';

class App extends Component {
  componentWillMount() {
    axios.get('http://locahost:8000/').then(res => console.log(res));
  }

  render() {
    return (
      <div className="Login">
      </div>
    );
  }
}

export default App;
