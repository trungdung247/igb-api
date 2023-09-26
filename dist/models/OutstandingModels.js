"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const outStandingSchema = new Schema({
  title_vi: {
    type: String,
    required: true,
    minlength: 6
  },
  title_en: {
    type: String,
    required: true,
    minlength: 6
  },
  description_vi: {
    type: String
  },
  description_en: {
    type: String
  },
  count: {
    type: String,
    required: true
  },
  suffix: {
    type: String
  },
  presen: {
    type: Boolean
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('OutstandingIndex', outStandingSchema);