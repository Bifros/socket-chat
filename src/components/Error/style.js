import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #A8D0C4;
  justify-content: center;
 `;

export const ErrorWrapper = styled.div`
  align-self: center;
`;

export const Error = styled.div`
  width: 100%;
  color: #4D8E91;
  font-size: 20px;
  font-family: Arial; 
  margin-top: 10px;
  text-align: center;
`;

export const ErrorTitle = Error.extend`
  font-size: 40px;
`;
