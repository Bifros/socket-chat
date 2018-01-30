import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'uuid';
import { isEmpty } from 'lodash';
import Dropzone from 'react-dropzone';
import storage from '../../../utils/storage';
import { shareFile } from '../../../api';
import { fileSizeFormat } from '../../../utils/helpers';
import AxiosHandler from '../../../utils/AxiosHandler';
import { apiEndpoints } from '../../../constants/path';
import {
  dropZone,
  Container,
  MessageContainer,
  MessageLineContainer,
  DateHeading,
  UserThumb,
  MessageTime,
  MessageMeta,
  SystemMessage,
  FileHolder,
  FileContainer,
  FileImage,
  FileMeta,
  ReverseContainer
} from './style';
import fileImg from '../../../assets/img/download.png';

class Chat extends Component {
  state = {
    accepted: [],
    rejected: [],
    acceptableFileTypes: [
      'image/*', 'audio/*', 'video/*', '.txt', 'text/uri-list'
    ].join()
  };

  componentWillMount() {
    this.user = storage.getUser();
  }

  isYou = (from) => from === this.user;

  renderChatMessages = () => {
    const { room } = this.props;
    console.log(this.props.roomMessages);
    if (!isEmpty(this.props.roomMessages) && this.props.roomMessages[room]) {
      return this.renderMessage(this.props.roomMessages[room]);
    }
  };

  renderMessage = (messages) => messages.map(message =>
    message.messageType === 'file'
      ? this.renderFileMessage(message)
      : message.from === 'SYSTEM'
        ? this.renderSystemMessage(message)
        : this.renderUserMessage(message));

  renderFileMessage = (message) => (
    <MessageLineContainer reverse={!this.isYou(message.from)} key={uuid.v4()}>
      <ReverseContainer reverse={!this.isYou(message.from)}>
        <MessageMeta>
          <UserThumb>{message.from.charAt(0)}</UserThumb>
          <MessageTime>{moment(message.timestamp).format('LT')}</MessageTime>
        </MessageMeta>
        <FileHolder>
          <FileContainer onClick={() => this.downloadFile(message)}>
            <FileImage src={fileImg} />
          </FileContainer>
          <FileMeta>
            {`"${message.msg ? message.msg.name : message.name}"
            ${message.msg ? message.msg.size : message.size}`}
          </FileMeta>
        </FileHolder>
      </ReverseContainer>
    </MessageLineContainer>
  );

  renderSystemMessage = (message) => (
    <MessageLineContainer key={uuid.v4()}>
      <SystemMessage>
        {message.msg}
      </SystemMessage>
    </MessageLineContainer>
  );

  renderUserMessage = (message) => (
    <MessageLineContainer reverse={!this.isYou(message.from)} key={uuid.v4()}>
      <ReverseContainer reverse={!this.isYou(message.from)}>
        <MessageMeta>
          <UserThumb>{message.from.charAt(0)}</UserThumb>
          <MessageTime>{moment(message.timestamp).format('LT')}</MessageTime>
        </MessageMeta>
        <MessageContainer>
          {message.msg}
        </MessageContainer>
      </ReverseContainer>
    </MessageLineContainer>
  );

  downloadFile(message) {
    if (!message.filePath) {
      message.filePath =
        `uploads/${message.room}/${message.from}/${message.name}`;
    }

    const axiosHandler = new AxiosHandler();
    axiosHandler
      .downloadFile(apiEndpoints.fileDownload, {
        file: message.filePath
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', message.filePath);
        document.body.appendChild(link);
        link.click();
      });
  }

  onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const fileAsArrayBuffer = reader.result;
        const filePayload = {
          name: file.name,
          type: file.type,
          size: fileSizeFormat(file.size),
          buffer: fileAsArrayBuffer
        };

        shareFile(filePayload);
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onprogress = () => console.log('reading file...');
    });
  };

  render() {
    return (
      <Container>
        <Dropzone
          accept={this.state.acceptableFileTypes}
          style={dropZone.base}
          activeStyle={dropZone.active}
          onDrop={this.onDrop}
          disableClick={true}
          multiple={true}
          disablePreview={true}
        >
        </Dropzone>
          <DateHeading>{moment().format('MMM Do')}</DateHeading>
          {this.renderChatMessages()}
      </Container>
    );
  }
}

export default Chat;
