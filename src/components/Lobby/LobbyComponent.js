import React from 'react';
import {
  Container
} from './style';

const LobbyComponent = ({
  user,
  online
}) => (
  <Container>
    <h3>Lobby, logged as {user}</h3>
    <h3>Users online: {online}</h3>
  </Container>
);

export default LobbyComponent;
