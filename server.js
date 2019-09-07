const express = require('express');
const app = express();
const dbCommection = require('./config/db');
dbCommection();
app.use(express.json({ extended: false }));

app.use('/api/user', require('./route/api/user'));
app.use('/api/auth', require('./route/api/auth'));
app.use('/api/contact', require('./route/api/contact'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on ports ${PORT}`));
