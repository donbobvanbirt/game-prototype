const express = require('express');

const router = express.Router();

const Game = require('../models/Game');

const defaultGrid = require('../utils').defaultGrid;

router.post('/', (req, res) => {
  const { name } = req.body;

  Game.create({
    grid: defaultGrid(),
    name,
  })
    .then((newGame) => {
      // console.log('newGame:', newGame);
      res.send(newGame);
    })
    .catch(err => res.status(400).send(err))
});

router.put('/:gameId', (req, res) => {
  // update game
});

router.get('/:gameId', (req, res) => {
  Game.findOne({ _id: req.params.gameId })
    .then(games => res.send(games))
    .catch(err => res.status(400).send(err));
});

router.get('/', (req, res) => {
  Game.find({}, 'name')
    .then(games => res.send(games))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
