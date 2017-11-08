'use strict';

var urlConfig = require('../slack-pads.config.js');
const express = require('express');
const router = express.Router();
var knex = require('../knex');
const request = require('request');
const payloads = require('../payloads')

router.post('/notifyuser', (req, res, next) => {
  console.log('in /notifyuser')
  var body = req.body;
  var options = {
    url: `${urlConfig.rentBotUrl}`,
    headers: {
      'Content-type':'application/json'
    }, 
    body: JSON.stringify(
      {
        "text":`Hey <@${body.user_name}>`,
        "attachments":[
          {
            "text":`New postings in filter ${body.id}`
          }
        ]
      }
    )
  }
  
function callback(error, response, body){
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

module.exports = router