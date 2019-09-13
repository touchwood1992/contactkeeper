const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

const dbCommection = require('./config/db');
dbCommection();
app.use(express.json({ extended: false }));

app.use('/api/user', require('./route/api/user'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/contact', require('./route/api/contact'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on ports ${PORT}`));
