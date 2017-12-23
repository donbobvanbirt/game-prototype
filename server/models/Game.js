const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  grid: [[{
    number: { type: Number },
    status: { type: String },
    position: { type: Array },
    buildings: { type: Object },
    resourceAbundance: { type: Array },
  }]],
  // name: { type: String, required: true },
  resources: {
    energy: { type: Number, required: true, default: 3000 },
    iron: { type: Number, required: true, default: 500 },
    gold: { type: Number, required: true, default: 200 },
    silver: { type: Number, required: true, default: 500 },
    nickel: { type: Number, required: true, default: 500 },
    carbon: { type: Number, required: true, default: 500 },
    hydrogen: { type: Number, required: true, default: 1000 },
    platinum: { type: Number, required: true, default: 100 },
    silicon: { type: Number, required: true, default: 1000 },
    copper: { type: Number, required: true, default: 1000 },
    steel: { type: Number, required: true, default: 2000 },
    machineParts: { type: Number, required: true, default: 500 },
    computerHardware: { type: Number, required: true, default: 0 },
  },
  // active: { type: Bool,true},
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
