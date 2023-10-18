module.exports = app => {
	const games = require('../controllers/games.controller.js');
	
	const router = require('express').Router();

	router.get('/getAllGames', games.getAllGames);
	router.get('/getGames', games.getGames);

	app.use('/api/games', router);
};
