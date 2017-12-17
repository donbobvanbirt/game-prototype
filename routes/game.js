const express = require('express');

const router = express.Router();

const Game = require('../models/Game');

const defaultGrid = require('../utils').defaultGrid;

router.post('/', (req, res) => {
  const { name } = req.body;

  Game.create({
    map: defaultGrid(),
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
  // specific game
});

router.get('/', (req, res) => {
  // all games
});

module.exports = router;
