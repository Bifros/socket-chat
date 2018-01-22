import styled from 'styled-components';
import { Field } from 'redux-form';

export const LoginWrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: #f8f8f8;
  padding: 30px;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  align-self: center;
  padding: 30px;
  background-color: #fff;
  width: 50%;
  box-sizing: border-box;
  border-radius: 6px;
`;

export const FormTitle = styled.span`
  color: #333;
  font-size: 20px;
  font-family: "Arial Black";
`;

export const Form = styled.form`
  margin-top: 5px;
`;

export const LoginInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  font-size: 15px;
  margin-top: 20px;
  padding-left: 25px;
  font-family: sans-serif;
  border-width: 2px;
  border-top: none;
  border-left: none;
  border-right: none;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  background-color: #74C489;
  border: none;
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  outline: none;
  color: #fff;
  font-family: "Arial Black";
  font-size: 16px;
  letter-spacing: 1px;
`;

export const RegisterBtn = styled.button`
  background-color: transparent;
  color: #00CCFF;
  border: none;
  font-family: "Arial Black";
  font-weight: 700;
  fot-size: 20px;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 0px;
  padding-bottom: 3px;
  text-align: center;
  width: 100%;
`;

export const ErrorBox = styled.div`
  height: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: red;
  font-size: 14px;
`;

export const MiddleWord = styled.div`
  width: 100%;
  color: #333;
  font-family: "Arial";
  font-weight: 900;
  font-size: 12px;
  text-align: center;
  padding: 18px 0px 15px 0px;
`;
