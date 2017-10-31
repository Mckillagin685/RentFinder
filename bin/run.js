#!/usr/bin/env node

const request = require('request');

request.post('https://rent-finder.herokuapp.com/api/startscan', (err, res, body) => {
  if (err) {
    console.log(err);
  }
  console.log(res.body);
});