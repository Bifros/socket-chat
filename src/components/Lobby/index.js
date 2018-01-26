import React, { Component } from 'react';
import uuid from 'uuid';
import Link from 'react-router';
import storage from '../../utils/storage';
import { apiEndpoints } from '../../constants/path';
import { connectToLobby, getMessage } from '../../api';
import { urlFormat } from '../../utils/helpers';
import AxiosHandler from '../../utils/AxiosHandler';
import LobbyComponent from './LobbyComponent';


class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: storage.getUser(),
      rooms: [],
      online: 0
    };

    this.axiosHandler = new AxiosHandler();
  }

  componentWillMount() {
    connectToLobby(
      this.state.user,
      (online) => this.setState({ online })
    );

    getMessage((data) => console.log(data));

    this.axiosHandler
      .get(apiEndpoints.lobbyInfo)
      .then(this.setLobbyInfo);
  }

  setLobbyInfo = (info) => {
    if (info.data && info.data.rooms) {
      this.setState({ rooms: info.data.rooms });
    }
  };

  renderRooms = () => this.state.rooms.map(room => (
    <li key={uuid.v4()}>
      <Link to={`/room/${urlFormat(room)}`}>
        {room.name}
      </Link>
    </li>
  ));

  render() {
    return (
      <LobbyComponent
        user={this.state.user}
        online={this.state.online}
        renderRooms={() => this.renderRooms()}
      />
    );
  }
}

export default Lobby;