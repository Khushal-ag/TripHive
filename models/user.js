const { number } = require('joi');
const mongo = require('mongoose');
const Schema = mongo.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    github: {
        type: String,
        default: 'Khushal-ag'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        default: 0
    }
})
UserSchema.plugin(passportLocalMongoose);

module.exports = mongo.model('User', UserSchema);