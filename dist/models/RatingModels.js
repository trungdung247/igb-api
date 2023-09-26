"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratingSchema = new Schema({
  name_vi: {
    type: String,
    required: true,
    minlength: 3
  },
  review_vi: {
    type: String,
    required: true,
    minlength: 3
  },
  name_en: {
    type: String,
    required: true,
    minlength: 3
  },
  review_en: {
    type: String,
    required: true,
    minlength: 3
  },
  position: {
    type: String
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});
module.exports = mongoose.model('Rating', ratingSchema);