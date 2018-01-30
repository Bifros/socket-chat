import React, { Component } from 'react';
import {
  connectToRoom, connectUserToRoom, subscribeToMessagesStream, reconnect, sendChatMessage, subscribeToAutoReconnect,
  subscribeToRoomUsersUpdates,
  switchRoom, subscribeToFileSharing
} from '../../api';
import Layout from '../Layout';
import RoomComponent from './RoomComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {populateMessage, updateRoomUsers} from '../../store/actions';
import {belongsToRoom} from '../../utils/helpers';
import storage from '../../utils/storage';

class Room extends Component {
  state = {
    roomName: null
  };

  componentWillMount() {
    if (this.props.location.state.roomName) {
      this.room = this.props.location.state.roomName;
      this.setState({ roomName: this.room });

      subscribeToAutoReconnect(this.reconnect);
      subscribeToMessagesStream(this.getMessage);

      subscribeToRoomUsersUpdates(this.room, this.props.updateRoomUsers);
      subscribeToFileSharing(this.populateFile);

      if (this.props.location.state.fromLobby) {
        switchRoom(this.room);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.roomName !== nextProps.location.state.roomName) {
      this.room = nextProps.location.state.roomName;
      this.setState({ roomName: this.room });

      switchRoom(this.room);
    }
  }

  reconnect = () => {
    reconnect();
    connectToRoom(storage.getUser(), this.room, (res) => {
      console.log(`user ${storage.getUser()} connected`);
    });
  };

  getMessage = (user, data) => {
    if (belongsToRoom(this.state.roomName, data) || user === 'SYSTEM') {
      Array.isArray(data)
      ? data.map(dataItem => {
          const parsed = JSON.parse(dataItem);

          typeof parsed.msg === 'object'
            ? this.populateFile(parsed.from, parsed.msg)
            : this.props.populateMessage(JSON.parse(dataItem));
        })
      : this.props.populateMessage(data);
    }
  };

  populateFile = (user, file) => {
    const data = file;

    data.from = user;
    data.messageType = 'file';
    data.timestamp = new Date();

    this.props.populateMessage(data);
  };

  sendMessage = (message) => sendChatMessage(message);

  render() {
    return (
      <Layout currentRouteName={this.state.roomName}>
        <RoomComponent
          roomName={this.state.roomName}
          roomUsers={this.props.roomUsers}
          roomMessages={this.props.roomMessages}
          sendMessage={(e) => this.sendMessage(e)}
        />
      </Layout>
    );
  }
}

const mapStateToProps = ({ users, chats }) => ({
  roomUsers: users.roomUsers,
  roomMessages: chats.roomsChats
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateRoomUsers,
  populateMessage
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);