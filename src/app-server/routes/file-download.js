const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  const file = `${path.resolve(__dirname, '../../../')}/${req.body.file}`;

  fs.readFile(file, (err) => {
    if (err) {
      res.send({ error: `Can't find the file ${path.basename(file)} on server.` });
    } else {
      res.download(file);
    }
  });
};
