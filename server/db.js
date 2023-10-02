const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGODB_URI } = process.env;
let db;

async function connectToDatabase() {
	if (!db) {
		const client = new MongoClient(MONGODB_URI, {
			useNewUrlParser: true, 
			useUnifiedTopology: true
		}
		)
		await client.connect();
		db = client.db();
		console.log('Connected to MongoDB');
	}
	return db;
}

module.exports = connectToDatabase;

