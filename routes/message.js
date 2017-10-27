'use strict';

const express = require('express');
const router = express.Router();
const knex = require('knex');
const request = require('request');
const payloads = require('./payloads')

router.post('/notifyuser', (req, res, next) => {
  var body = JSON.parse(req.body)
  var payload = payloads.userNotify
  request('https://hooks.slack.com/services/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', (req, res, body) => {
    
  })
})