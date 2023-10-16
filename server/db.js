/**
 * @module db.js
 * initiates the connection to the database when called
 */

const {MongoClient} = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

let _db;

async function initiateConnection() {
	const client = new MongoClient(MONGODB_URI);
	try {
		await client.connect();
		_db = client.db('baseball-website');
	} catch (e) {
		console.error(`Something went wrong: ${e}`)
	}
}
function getDb() {
	return _db;
}

module.exports = {initiateConnection, getDb};
