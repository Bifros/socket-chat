import React from 'react';
import {
  RoomContainer,
  Container
} from './style';
import RoomUsersList from './RoomUsersList';
import UserControlForm from './UserControlForm';
import Chat from './Chat';

const RoomComponent = ({
  roomName,
  roomUsers,
  roomMessages,
  sendMessage
}) => (
  <RoomContainer>
    <RoomUsersList
      roomName={roomName}
      usersList={roomUsers}
    />
    <Container>
      <Chat
        room={roomName}
        roomMessages={roomMessages}
      />
      <UserControlForm
        onMessageSend={sendMessage}
      />
    </Container>
  </RoomContainer>
);

export default RoomComponent;