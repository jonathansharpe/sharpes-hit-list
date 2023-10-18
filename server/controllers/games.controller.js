const dbUtil = require('../db.js');
let db;

exports.getAllGames = async (req, res) => {
	db = dbUtil.getDb();
	// console.log(db);
	const retVal = await db.collection("games").find();
	const results = await retVal.toArray();
	if (results.length > 0 ) {
		results.forEach((result, i) => {
			res.send(`${i+1}. game: ${result}`);
		})
	}
	else {
		console.log(`no listings found`);
	}
};

exports.getGames = async (req, res) => {
	db = dbUtil.getDb();
	try {
		const retVal = await db.collection("games").find({
			month: req.body.month,
			day: req.body.day,
			year: req.body.year,
			homeTeam: req.body.homeTeam,
			roadTeam: req.body.roadTeam,
			homeTeamRuns: req.body.homeTeamRuns,
			roadTeamRuns: req.body.roadTeamRuns,
			venue: req.body.venue
		});
		console.log(retVal);
		const results = await retVal.toArray();
		console.log(results);
		if (results.length > 0 ) {
			results.forEach((result, i) => {
				res.send(`${i+1}. game: ${result}`);
			})
		}
		else {
			res.send(`no listings found`);
		}
	} 
	catch (err) {
		return res.status(500).send({
			message: err.message || "Could not find games matching query"
		});
	}
};
