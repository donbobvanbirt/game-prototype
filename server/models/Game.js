const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  grid: [[{
    number: { type: Number },
    status: { type: String },
    position: { type: Array },
    buildings: { type: Object },
    resourceAbundance: { type: Array },
  }]],
  createdAt: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  resources: {
    energy: { type: Number, required: true, default: 2500 },
    iron: { type: Number, required: true, default: 0 },
    gold: { type: Number, required: true, default: 0 },
    silver: { type: Number, required: true, default: 0 },
    nickel: { type: Number, required: true, default: 0 },
    carbon: { type: Number, required: true, default: 200 },
    hydrogen: { type: Number, required: true, default: 0 },
    platinum: { type: Number, required: true, default: 0 },
    silicon: { type: Number, required: true, default: 0 },
    copper: { type: Number, required: true, default: 250 },
    steel: { type: Number, required: true, default: 2000 },
    machineParts: { type: Number, required: true, default: 350 },
    computerHardware: { type: Number, required: true, default: 0 },
  },
  // active: { type: Bool, required: true, default: false },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
