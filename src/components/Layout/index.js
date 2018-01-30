import React, { Component } from 'react';
import RoomsList from '../RoomsList';
import {
  Container,
} from './style';


class Layout extends Component {
  render() {
    return (
      <Container>
        <RoomsList currentRouteName={this.props.currentRouteName} />
        {this.props.children}
      </Container>
    );
  }
}

export default Layout;