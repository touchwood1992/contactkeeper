const express = require('express');
const path = require('path');
const fileUploade = require('express-fileupload');

const app = express();

const dbCommection = require('./config/db');
dbCommection();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUploade());
app.use(express.static('imguploads'));

app.use('/api/user', require('./route/api/user'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/contact', require('./route/api/contact'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on ports ${PORT}`));
