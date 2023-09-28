const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
});

const Game = mongoose.model('Game', gameSchema);

module.exports= Game;
