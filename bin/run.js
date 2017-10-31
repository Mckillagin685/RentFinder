#!/usr/bin/env node

const request = require('request');

request('https://rent-finder.herokuapp.com/api/startscan/153j6kl63hsu38', (err, res, body) => {
  if (err) {
    console.log(err);
  }
  console.log(res.body);
});