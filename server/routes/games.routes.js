module.exports = app => {
	const games = require('../controllers/games.controller.js');
	
	const router = require('express').Router();

	router.get('/get-games', games.getAllGames);

	app.use('/api/games', router);
};
