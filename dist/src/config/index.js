"use strict";

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT || 8797,
  HOST: process.env.HOST,
  pathImage: process.env.HOST + "uploads/",
  listLanguages: ["vi", "en"]
};