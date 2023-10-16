/**
 * @module server.js
 * this file is run to start the backend server. it makes calls to connect to the database and the rest is handled by routes.
 */
const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();
const app = express();
const db = require('./db.js');
app.use(express.json());

require('./routes/games.routes.js')(app);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();

	console.log("Databases:");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function getGames(client) {
	gamesList = await client.db("baseball-website").collection("games").find(
		{
			year: 2023
		}
	);
	const results = await gamesList.toArray();
	if (results.length > 0 ) {
		results.forEach((result, i) => {
			console.log(`${i+1}. homeTeam: ${result.homeTeam}`);
		})
	}
	else {
		console.log(`no listings found`);
	}
}

async function main() {
	try {
		db.initiateConnection();
		// await getGames(client);
		// await client.close();
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.error(`Something went wrong: ${e}`);
	}
}

main();

