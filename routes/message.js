'use strict';

const express = require('express');
const router = express.Router();
var knex = require('../knex');
const request = require('request');
const payloads = require('../payloads')

router.post('/notifyuser', (req, res, next) => {
  var body = JSON.parse(req.body)
  var options = {
    url: 'https://hooks.slack.com/services/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',
    headers: {
      'Content-type':'application/json'
    }, 
    body: JSON.stringify(
      {
        "text":`Hey <@${body.user.name}>`,
        "attachments":[
          {
            "text":`New postings in filter ${body.filter.id}`
          }
        ]
      }
    )
  }
  
function callback(error , response, body){
    console.log('Post Notification')
    if (!error && response.statusCode == 200) {
      console.log(body)
      return;
    }
  console.log(error)
  console.log('nope')
  console.log('dont blame me im doing my job its gotta be the code')
}
  
  request.post(options, callback)
})