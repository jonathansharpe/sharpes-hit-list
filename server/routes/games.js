const express = require('express');
const { fetchGames } = require('../handlers/games.js');

const router = express.Router();
const dbo = require('../db.js');
const ObjectId = require('mongodb').ObjectId;

router.route('getGames').get(function (req, res) {
	let db_connect = dbo.connectToDatabase('games')
})

module.exports = router;
