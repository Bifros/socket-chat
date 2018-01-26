import React from 'react';
import {
  Container
} from './style';

const LobbyComponent = ({
  user,
  online,
  renderRooms
}) => (
  <Container>
    <h3>Lobby, logged as {user}</h3>
    <h3>Users online: {online}</h3>

    <ul>
      {renderRooms()}
    </ul>
  </Container>
);

export default LobbyComponent;
