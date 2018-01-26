import React, { Component } from 'react';
import {switchRoom} from '../../api';

class Room extends Component {
  componentWillMount() {
    //switchRoom();
  }

  render() {
    return (
      <div>
        Room {console.log(this.props)}
      </div>
    );
  }
}

export default Room;