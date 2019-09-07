const mongoose = require('mongoose');
const config = require('config');
const dbURL = config.get('mongoURI');
const dbCommection = async () => {
	try {
		await mongoose.connect(dbURL, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
		console.log('Mongoose Connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
module.exports = dbCommection;
