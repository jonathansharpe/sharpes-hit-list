const express = require('express');
const {MongoClient} = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());

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
	const client = new MongoClient(MONGODB_URI);
	try {
		await client.connect();
		await getGames(client);
	} catch (e) {
		console.error(`Something went wrong: ${e}`);
	} finally {
		await client.close();
	}
}

main();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
