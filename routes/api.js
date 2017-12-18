const express = require('express');

const router = express.Router();

router.use('/sample', require('./sample'));
router.use('/game', require('./game'));

module.exports = router;
