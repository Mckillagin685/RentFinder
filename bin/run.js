#!/usr/bin/env node

const urlConfig = require('../slack-pads.config.js');
const request = require('request');

request.get(`${urlConfig.deployUrl}api/startscan`, (err, res, body) => {
  if (err) {
    console.log(err);
  }
  console.log(res.statusCode);
});