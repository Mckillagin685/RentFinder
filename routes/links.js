'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const request = require('request');
const cheerio = require('cheerio');

router.get('/scraper', (req, res, next) => {
  var picsPets = ''
  if(req.body.pets === true){
    picsPets += '&pets=Y'
  }
  if(req.body.photos === true){
    picsPets += '&pics=Y'
  }
  let result = [];
  let object = {filter_id: req.body.id};
  request(`http://www.rentalsource.com/rentals/${req.body.state}/${req.body.city}/?min=${req.body.min}&max=${req.body.max}&beds=${req.body.beds}&baths=${req.body.baths}&types%5B%5D=hous&types%5B%5D=apt&types%5B%5D=town&types%5B%5D=cond&types%5B%5D=vac${picsPets}&pos=0&sortby=updated&orderby=asc`, (err, res, body) => {
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body);
      $('.ptb5 a[href]').each(function(){
        var url = this.attribs.href
        if(result.indexOf(url) === -1){
          result.push(url)
        }
      })
      object.links = result;
      knex('links')
        .insert(callbackId, '*')
        .catch((err) => {
          console.log(err)
        })
      res.send(result)
    }
  })
})

router.get('/links/:id', (req, res, next) => {
  knex('links')
    .where('filter_id', req.params)
    .then((links) => {
      return res.send(links);
    })
    .catch((err) => {
      console.log(err);
    })
})