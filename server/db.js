
const {MongoClient} = require('mongodb');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function initiateConnection() {
	const client = new MongoClient(MONGODB_URI);
	try {
		await client.connect();
	} catch (e) {
		console.error(`Something went wrong: ${e}`)
	}
	return client;
}

module.exports = {initiateConnection};
