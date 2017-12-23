const express = require('express');

const router = express.Router();

const Game = require('../models/Game');
const getRevenue = require('../models/revenue');

const defaultGrid = require('../utils').defaultGrid;

router.post('/', (req, res) => {
  const { name } = req.body;

  Game.create({
    grid: defaultGrid(),
  })
    .then((newGame) => {
      res.send(newGame);
    })
    .catch(err => res.status(400).send(err))
});

// router.put('/build-base/:gameId', (req, res) => {
//   // const { number } = req.body;
//
//   Game.findOneAndUpdate(
//     { _id: req.params.gameId, 'grid.number': req.body.number },
//     { $set: { status: 'controlled' } },
//     { new: true },
//   )
//     .then(game => res.send(game))
//     .catch(err => res.status(400).send(err));
// });

router.put('/:gameId', (req, res) => {
  Game.findOneAndUpdate(
    { _id: req.params.gameId },
    { $set: req.body },
    { new: true },
  )
    .then(game => res.send(game))
    .catch(err => {
      res.status(400).send(err);
    });
});

router.get('/:gameId', (req, res) => {
  Game.findOne({ _id: req.params.gameId })
    .then((games) => {
      getRevenue(req.params.gameId)
      res.send(games)
    })
    .catch(err => res.status(400).send(err));
});

router.get('/', (req, res) => {
  Game.find({}, 'name')
    .then(games => res.send(games))
    .catch(err => res.status(400).send(err));
});

module.exports = router;
