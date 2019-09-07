const mongoose = require('mongoose');
const userSChema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now }
});
const userModel = mongoose.model('users', userSChema);
module.exports = userModel;
