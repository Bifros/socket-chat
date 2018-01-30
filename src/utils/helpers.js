export const urlFormat = path => path
  .split(' ')
  .join('_')
  .replace(/\|&;\$%@"<>\(\)\+,/g, "")
  .toLowerCase();

export const belongsToRoom = (room, messageObj) => messageObj.room === room;

export const fileSizeFormat = (bytes) => {
  if (bytes >= 1073741824) { bytes = (bytes/1073741824).toFixed(2)+' GB'; }
  else if (bytes >= 1048576) { bytes = (bytes/1048576).toFixed(2)+' MB'; }
  else if (bytes >= 1024) { bytes = (bytes/1024).toFixed(2)+' KB'; }
  else if (bytes > 1) { bytes = bytes+' bytes'; }
  else if (bytes === 1) { bytes = bytes+' byte'; }
  else { bytes='0 byte'; }
  return bytes;
};
