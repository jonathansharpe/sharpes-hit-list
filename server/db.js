/**
 * @module db.js
 * initiates the connection to the database when called
 */

const {MongoClient, ServerApiVersion} = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

let _db;

async function initiateConnection() {
	try {
		await client.connect();
		// console.log(client);
		await client.db('admin').command({ping: 1});
		console.log(`MongoDB successfully pinged`);
		_db = client.db('baseball-website');
	} catch (e) {
		console.error(`Something went wrong: ${e}`)
	}
}
function getDb() {
	// console.log(`getDb has been called`);
	return _db;
}

module.exports = {initiateConnection, getDb};
