export const urlFormat = path => path
  .split(' ')
  .join('_')
  .replace(/\|&;\$%@"<>\(\)\+,/g, "")
  .toLowerCase();