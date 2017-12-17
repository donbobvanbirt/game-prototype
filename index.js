require('dotenv').config({ silent: true });

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGOODB_URI;

// MONGOOSE CONFIGURATION
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `MongoDB connected to ${MONGODB_URI}`);
});

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express listening on PORT ${port}`);
