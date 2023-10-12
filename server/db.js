const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGODB_URI } = process.env;
const client = new MongoClient(MONGODB_URI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
});
let db;

async function connectToDatabase() {
	try {
		await client.connect();
	} catch (e) {
		console.error(`db.js: Something went wrong: ${e}`);
	}
	db = client.db('games');
	console.log('Connected to MongoDB');
	return db;
}

module.exports = connectToDatabase;

