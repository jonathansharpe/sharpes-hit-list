const dbUtil = require('../db.js');
const db = dbUtil.getDb();

exports.getAllGames = async (req, res) => {
	gamesList = await db.collection("games").find(
		{
		}
	);
	const results = await gamesList.toArray();
	if (results.length > 0 ) {
		results.forEach((result, i) => {
			console.log(`${i+1}. game: ${result}`);
		})
	}
	else {
		console.log(`no listings found`);
	}
};
