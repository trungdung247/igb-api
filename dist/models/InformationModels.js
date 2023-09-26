"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const informationSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  content_vi: {
    type: String
  },
  content_en: {
    type: String
  },
  type: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Information', informationSchema);