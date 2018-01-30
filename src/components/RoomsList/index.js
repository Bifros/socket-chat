import React, { Component } from 'react';
import uuid from 'uuid';
import AxiosHandler from '../../utils/AxiosHandler';
import { apiEndpoints, appRoutes } from '../../constants/path';
import {
  Container,
  Title,
  List,
  Item
} from './style';
import { urlFormat } from '../../utils/helpers';
import { history } from '../../store';

class RoomsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  setupRooms = (res) => {
    if (res.data.error) {
      history.push({
        pathname: appRoutes.error,
        message: res.data.error
      });
    } else {
      this.setState({ rooms: res.data.rooms });
    }
  };

  componentWillMount() {
    const axiosHandler = new AxiosHandler();
    axiosHandler
      .get(apiEndpoints.roomsList)
      .then(this.setupRooms.bind(this));
  }

  navigateTo = (roomName) => history
    .push({
      pathname: `/room/${urlFormat(roomName)}`,
      state: {
        roomName,
        fromLobby: this.props.currentRouteName === 'lobby'
      }
    });

  renderItems = () => this.state.rooms.map(room => (
    <Item
      key={uuid.v4()}
      onClick={() => this.navigateTo(room.name)}
    >
      {room.name}
    </Item>
  ));

  render() {
    return (
      <Container>
        <Title>AVAILABLE ROOMS</Title>
        <List>
          {this.renderItems()}
        </List>
      </Container>
    );
  }
}

export default RoomsList;