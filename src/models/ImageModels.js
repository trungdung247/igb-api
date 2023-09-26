const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    path: {type: String, required: true},
    name: {type: String, required: true},
    module: {type: String},
    mimeType: {type: String},
    destination: {type: String},
    originalName: {type: String},
    size: {type: String},
    created: {type: Date, default: Date.now},
    updated: {type: Date}
});

module.exports = mongoose.model('Image', imageSchema);