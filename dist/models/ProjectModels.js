"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectSchema = new Schema({
  title_vi: {
    type: String,
    required: true,
    minlength: 6
  },
  sapo_vi: {
    type: String,
    required: true,
    minlength: 6
  },
  detail_vi: {
    type: String,
    required: true,
    minlength: 6
  },
  title_en: {
    type: String,
    required: true,
    minlength: 6
  },
  detail_en: {
    type: String,
    required: true,
    minlength: 6
  },
  sapo_en: {
    type: String,
    required: true,
    minlength: 6
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String
  },
  type: {
    type: String,
    enum: ['highlight', 'app', 'web', 'brand', 'design']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Project', projectSchema);