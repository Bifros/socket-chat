import React, { Component } from 'react';
import {
  UserControlArea,
  TypeArea,
  SendButton
} from './style';
import send from '../../../assets/img/send-big.png';

class UserControlForm extends Component {
  state = {
    inputValue: ''
  };

  updateUSerInput = (e) => this.setState({ inputValue: e.target.value });
  clearUserInput = () => this.setState({ inputValue: '' });

  handleKeyPress = (e, callback) => {
    if (e.nativeEvent.keyCode === 13) {
      if (e.nativeEvent.shiftKey) {
      } else {
        e.preventDefault();
        callback(e.target.value);
        this.clearUserInput();
      }
    }
  };

  render() {
    const { onMessageSend } = this.props;
    return (
      <UserControlArea>
        <TypeArea
          placeholder="Type your message..."
          autoComplete="off"
          resize={false}
          onKeyPress={(e) => this.handleKeyPress(e, onMessageSend)}
          onChange={this.updateUSerInput}
          value={this.state.inputValue}
        />
        <SendButton src={send} />
      </UserControlArea>
    );
  }
}

export default UserControlForm;