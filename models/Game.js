const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  grid: [[{
    number: { type: Number },
    status: { type: String },
    position: { type: Array },
    buildings: { type: Object },
  }]],
  // name: { type: String, required: true },
  resources: {
    energy: { type: Number, required: true, default: 1000 },
    iron: { type: Number, required: true, default: 1000 },
    gold: { type: Number, required: true, default: 1000 },
    silver: { type: Number, required: true, default: 1000 },
    nickel: { type: Number, required: true, default: 1000 },
    carbon: { type: Number, required: true, default: 1000 },
    hydrogen: { type: Number, required: true, default: 1000 },
    platinum: { type: Number, required: true, default: 1000 },
    silicon: { type: Number, required: true, default: 1000 },
    copper: { type: Number, required: true, default: 1000 },
    steel: { type: Number, required: true, default: 1000 },
    machineParts: { type: Number, required: true, default: 1000 },
    computerHardware: { type: Number, required: true, default: 1000 },
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
