const mongo = require('mongoose');
const Schema = mongo.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})
UserSchema.plugin(passportLocalMongoose);

module.exports = mongo.model('User', UserSchema);