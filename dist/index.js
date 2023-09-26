"use strict";

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

//connect db
mongoose.connect(DB_URL, {
  useNewUrlParser: false,
  useUnifiedTopology: true
}).then(() => console.log('DB Connected!'));
db.on('error', err => {
  console.log('DB connection error:', err.message);
});
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(expressValidator());
app.use('/api', routes);
app.listen(PORT, () => {
  console.log("Server API started");
});
module.exports = app;