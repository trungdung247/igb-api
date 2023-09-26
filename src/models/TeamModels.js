const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    image: {type: String},
    name: {type: String, required: true, minlength: 3},
    position: {type: String},
    manager: {type: Boolean},
    link_linkedin: {type: String},
    link_facebook: {type: String},
    link_github: {type: String},
    link_twitter: {type: String},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    created: {type: Date, default: Date.now},
    updated: {type: Date}
});

module.exports = mongoose.model('Team', teamSchema);