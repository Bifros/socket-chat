import styled from 'styled-components';

export const UserControlArea = styled.div`
  display: flex;
  height: 70px;
  background-color: #fff;
  align-self: flex-end;
  width: 100%;
  padding: 10px 30px 10px 30px;
  box-sizing: border-box;
  border-top: 2px solid #E7E8EC;
`;

export const TypeArea = styled.textarea`
  overflow: hidden;
  width: 100%;
  resize: none;
  font-size: 14px;
  color: #333;
  outline: none;
  padding: 17px 20px 0px 10px;
  font-family: sans-serif;
  border: none;
`;

export const SendButton = styled.img`
  height: 24px;
  width: 24px;
  align-self: center;
`;