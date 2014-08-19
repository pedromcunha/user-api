//Define user schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	password: String
});

module.exports = mongoose.model('User', UserSchema);
