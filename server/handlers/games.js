
async function fetchGames(req, res) {
	const db = req.db;
	const collection = await db.collection('games');
	const data = await collection.find({}).toArray();
	res.json(data);
}

module.exports =  { fetchGames };
