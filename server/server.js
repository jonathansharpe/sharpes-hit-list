const express = require('express');
const connectToDatabase = require('./db'); // Import the connection function
const gameRoute = require('./routes/games.js');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/games', gameRoute);

app.listen(PORT, async () => {
	await connectToDatabase(function (err) {
		if (err) console.error(`server.js: Something went wrong: ${err}`);
	});
	console.log(`Server is running on port ${PORT}`);
});
