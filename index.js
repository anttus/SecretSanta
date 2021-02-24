const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api-routes');

const app = express();
const port = process.env.PORT || 8080;
const db = mongoose.connection;

app.use(bodyParser.json());
app.use('/api', apiRoutes);

if (!db) {
	console.log('Error connecting to DB');
} else {
	console.log('DB connected successfully');
}

mongoose.connect('mongodb://localhost/resthub', {
	useNewUrlParser: true,
});

app.listen(port, function () {
	console.log('Running node on port ' + port);
});
