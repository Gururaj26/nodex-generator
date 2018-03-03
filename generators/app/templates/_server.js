const express = require('express')
const bodyParser = require('body-parser')
const logger = require('heroku-logger')
const request = require('request')
const fs = require('fs')
const figlet = require('figlet')
const utils = require('./utils.js')
const name = utils.name;

const appname = "<%= name %>"

const app = express()

figlet.text(appName, {
  font: 'Cosmike'
}, function(err, data) {
  console.log(data);
});

app.use(bodyParser.json());

app.post('/', (req, res) => {
  //
});

let port = process.env.PORT || 3000;
app.listen(port, () => logger.info('wtfsig app is listening on port 3000!'))
