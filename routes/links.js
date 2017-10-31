'use strict';

const express = require('express');
const router = express.Router();
var knex = require('./knex')
const request = require('request');
const cheerio = require('cheerio');

router.post('/scheduledscraper', (req, res, next) => {
  console.log("in /scheduledscraper")
  var body = JSON.parse(req.body)
  var picsPets = ''
  if(body.pets === true){
    picsPets += '&pets=Y'
  }
  if(body.photos === true){
    picsPets += '&pics=Y'
  }
  let result = [];
  let object = {filter_id: body.id};
  request(`http://www.rentalsource.com/rentals/${body.state}/${body.city}/?min=${body.min}&max=${body.max}&beds=${body.beds}&baths=${body.baths}&types%5B%5D=hous&types%5B%5D=apt&types%5B%5D=town&types%5B%5D=cond&types%5B%5D=vac${picsPets}&pos=0&sortby=updated&orderby=asc`, (err, res, body) => {
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body);
      $('.ptb5 a[href]').each(function(){
        var url = this.attribs.href
        if(result.indexOf(url) === -1){
          result.push(url)
        }
      })
      object.links = JSON.stringify(result);
      knex('links')
        .where('filter_id', body.filter.id)
        .then((links) => {
          if(links && JSON.parse(links.links) !== result){
            
            let options = {
              url:'https://rent-finder.herokuapp.com/notifyuser',
              body: body
            }

            request(options, (err, res, body) => {
              if (err){
                console.log(err);
              }
              res.status(200).end();
            })

          }
        })
        .insert(object, '*')
        .catch((err) => {
          console.log(err);
        })
      res.send(result);
    }
  })
})

// make different call for /listResults command

// router.get('/links/:id', (req, res, next) => {
//   knex('links')
//     .where('filter_id', req.params)
//     .then((links) => {
//       return res.send(links);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// })