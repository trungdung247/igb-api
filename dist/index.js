"use strict";

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./src/routes/routes');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require("cors");
const path = require('path');
const app = express();
const config = require('./src/config');
const {
  PORT,
  DB_URL
} = config;
const db = mongoose.connection;

//---- Connect DB ------
mongoose.connect(DB_URL, {
  useNewUrlParser: false,
  useUnifiedTopology: true
}).then(() => console.log('DB Connected!'));
db.on('error', err => {
  console.log('DB connection error:', err.message);
});
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};
const port = normalizePort(PORT);
app.use(session({
  secret: 'igb group api',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(expressValidator());
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use('/api', routes);

/**
* Event listener for HTTP server "listening" event.
*/
const server = http.createServer(app);
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}\nServer API started!!`);
};
server.listen(port);
server.on('listening', onListening);
module.exports = server;