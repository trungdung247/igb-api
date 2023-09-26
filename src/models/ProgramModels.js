const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new Schema({
    image: {type: String},
    link: {type: String},
    title: {type: String, required: true, minlength: 3},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    updated: {type: Date}
});

module.exports = mongoose.model('Program', programSchema);