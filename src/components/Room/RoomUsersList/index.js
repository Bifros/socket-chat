import React, { Component } from 'react';
import uuid from 'uuid';
import {
  Container,
  UserContainer,
  UserName,
  UserStatus,
  RoomTitle
} from './style';

class RoomUsersList extends Component {
  renderUsers = () => this.props.usersList.map(item =>
    <UserContainer key={uuid.v4()}>
      <UserName>{item}</UserName>
      <UserStatus>Some really cool status I got!</UserStatus>
    </UserContainer>
  );

  render() {
    return (
      <Container>
        <RoomTitle>{`#${this.props.roomName}` || 'Room #'}</RoomTitle>
        {this.renderUsers()}
      </Container>
    );
  }
}

export default RoomUsersList;