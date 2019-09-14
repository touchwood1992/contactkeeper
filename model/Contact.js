const mongoose = require('mongoose');
const contactSchema = mongoose.Schema({
	name: { type: String },
	email: { type: String },
	phone: { type: String },
	date: { type: Date },
	cimage: { type: String, default: null },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
});
const contactModel = mongoose.model('contacts', contactSchema);

module.exports = contactModel;
