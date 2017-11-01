'use strict';

const express = require('express');
var knex = require('../knex');
const router = express.Router();

router.get('/numfilters', (req, res, next)=>{
  var username = req.body.user_name;

  knex('filters')
    .where('user_name', username)
    .then((filters) => {
      var filterLength = filters.length
      return res.send(filtersLength)
    })
    .catch((err)=>{
      console.log(err)
    })
    return res.sendStatus(500);
})

router.get('/filters', (req, res, next) => {
  console.log(req.body)
  var username = req.body.user_name;
  
    knex('filters')
      .where('user_name', username)
      .then((filters) => {
        return res.send(filters)
      })
      .catch((err)=>{
        console.log(err)
      })
      return res.sendStatus(500);
})


module.exports = router;