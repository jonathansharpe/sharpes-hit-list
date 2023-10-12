
const connectToDatabase = require('./db.js');

async function performDatabaseOperation() {
	const db = await connectToDatabase(); 

	const collection = db.collection('games');

	const result = await collection.find({ year: 2023 });
	console.log(`result: ${result}`);
	
}

module.exports = performDatabaseOperation;
