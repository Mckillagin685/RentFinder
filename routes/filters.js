'use strict';

const express = require('express');
var knex = require('../knex');
const router = express.Router();

router.get('/numfilters', (req, res, next)=>{
  var username = req.body.user_name;

  knex('filters')
    .where('user_name', username)
    .then((filters) => {
      var filtersLength = filters.length
      res.send([filtersLength])
    })
    .catch((err)=>{
      console.log(err)
    })
})

router.get('/filters', (req, res, next) => {
  const username = req.body.user_name;
  
    knex('filters')
      .where('user_name', username)
      .then((filters) => {
        res.send(filters);
      })
      .catch((err)=>{
        console.log(err)
      });
});

router.delete('/filter', (req, res, next) => {
  const userName = req.body.user_name;
  const filterId = req.body.filter_id;

  knex('filters')
    .where({user_name: userName, id: filterId})
    .del()
    .catch((err) => {
      console.log(err)
    });
});


module.exports = router;