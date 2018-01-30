import styled from 'styled-components';

export const dropZone = {
  base: {
    marginTop: '10px',
    marginLeft: '20px',
    position: 'fixed',
    height: 'calc(100% - 120px)',
    width: 'calc(100% - 510px)',
    border: '2px solid transparent'
  },
  active: {
    border: '2px dashed #aaa',
    backgroundColor: 'rgba(0, 0, 0, .04)',
    borderRadius: '10px',
    color: '#000'
  }
};

export const Container = styled.div`
  flex: 1;
  padding: 10px 0px 10px 0px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export const ReverseContainer = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => reverse ? 'row-reverse' : 'row'};
`;

export const MessageLineContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 15px 0px;
  justify-content: ${({ reverse }) => reverse ? 'flex-end' : 'flex-start'};
`;

export const UserThumb = styled.div`
  margin-top: 10px;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  padding: 7px 10px;
  color: #fff;
  background-color: #333;
  border-radius: 20px;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  margin: auto;
`;

export const MessageTime = styled.div`
  color: #999;
  font-size: 11px;
  margin-top: 7px;
`;

export const MessageMeta = styled.div`
  align-self: ${({ reverse }) => reverse ? 'flex-end' : 'flex-start'};
  flex-direction: column;
  margin-right: 15px;
  margin-left: 15px;
`;

export const MessageContainer = styled.div`
  display: inline-table;
  max-width: 200px;
  padding: 10px 15px;
  background: linear-gradient(to right, #dd5e89, #f7bb97); /* #614385, #516395  #085078, #85d8ce  #1cd8d2, #93edc7 */
  color: #fff;
  border-radius: 5px;
  font-size: 14px;
  font-family: sans-serif;
  ${({ reverse }) => reverse === true ? 'right: 70px;' : 'left: 60px;' }
`;

export const SystemMessage = styled.div`
  flex: 1;
  color: #999;
  font-size: 13px;
  font-style: italic;
  text-align: center;
  font-family: sans-serif;
`;

export const FileHolder = styled.div`
  align-self: ${({ reverse }) => reverse ? 'flex-start' : 'flex-end'};
`;

export const FileContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 15px 13px;
  border-radius: 8px;
  background: linear-gradient(to right, #614385, #516395);
  cursor: pointer;
  overflow: hidden;
  
  &:hover:before {
    display: block;
    content: "DOWNLOAD";
    font-size: 12px;
    text-align: center;
    color: #fff;
    padding-top: 38px;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, .5);
  }
`;

export const FileImage = styled.img`
  height: 64px;
  width: 64px;
`;

export const FileMeta = styled.div`
  color: #999;
  font-size: 11px;
  font-family: sans-serif;
  margin-top: 2px;
  text-align: center;
  text-transform: uppercase;
  white-space: break-word;
  width: 96px;
`;

export const DateHeading = styled.div`
  text-align: center;
  color: #999;
  font-size: 12px;
  position: relative;
  
  &:before {
    border-top: 1px solid #d1d1d1;
    display: block;
    content: '';
    width: 40%;
    top: -3px;
    left: 0;
    position: absolute;
    margin-top: 10px;
  }
  
  &:after {
    border-top: 1px solid #d1d1d1;
    display: block;
    content: '';
    width: 40%;
    top: -3px;
    right: 0;
    position: absolute;
    margin-top: 10px;
  }
`;
