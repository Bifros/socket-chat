import React, { Component } from 'react';
import uuid from 'uuid';
import storage from '../../utils/storage';
import { apiEndpoints } from '../../constants/path';
import {connectToLobby, connectToRoom, subscribeToMessagesStream, switchRoom} from '../../api';
import {belongsToRoom, urlFormat} from '../../utils/helpers';
import AxiosHandler from '../../utils/AxiosHandler';
import { history } from '../../store';
import LobbyComponent from './LobbyComponent';
import Layout from '../Layout';

class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.location.state.name || storage.getUser(),
      rooms: [],
      online: 0
    };

    this.axiosHandler = new AxiosHandler();
  }

  componentWillMount() {
    connectToRoom(
      this.state.user,
      'lobby',
      (online) => this.setState({ online })
    );

    subscribeToMessagesStream((user, data) => {
      if (belongsToRoom('lobby', data)) {
        console.log(data.msg);
      }
    });

    this.axiosHandler
      .get(apiEndpoints.roomsList)
      .then(this.setLobbyInfo);
  }

  setLobbyInfo = (info) => {
    if (info.data && info.data.rooms) {
      this.setState({ rooms: info.data.rooms });
    }
  };

  render() {
    return (
      <Layout currentRouteName="lobby">
        <LobbyComponent
          user={this.state.user}
          online={this.state.online}
        />
      </Layout>
    );
  }
}

export default Lobby;