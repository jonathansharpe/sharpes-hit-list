const express = require('express');
const router = express.Router();
const Game = require('../models/Game.js');

router.get('/getGames', async (req, res) => {
	try {
		const games = await Game.find({});
		res.json(games);
	} catch (e) {
		console.error(`Something went wrong: ${e}`);
		res.status(500);
	}
});

module.exports = router;
