#!/usr/bin/env node

const request = require('request');

request.get('/api/startscan', (err, res, body) => {
  if (err) {
    console.log(err);
  }
  console.log(res.body);
});