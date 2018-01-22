const express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  morgan = require('morgan'),
  authMiddleware = require('./middleware/authMiddleware'),
  corsMiddleware = require('./middleware/corsMiddleware'),
  router = require('./routes'),
  db = require('../database/db');

const port = process.env.PORT || 8001;
const app = express();
const server = http.createServer(app);

/* Middleware setup */
app.use(morgan('dev'));
app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware);

/* Routes setup */
app.use(router);

server.listen(port, () => console.log(`App server is on ${port}`));