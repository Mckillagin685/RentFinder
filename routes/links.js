'use strict';

const express = require('express');
const router = express.Router();
var knex = require('../knex');
const request = require('request');
const cheerio = require('cheerio');

router.post('/scheduledscraper', (req, res, next) => {
  console.log("in /scheduledscraper")
  var body = req.body
  var picsPets = ''
  if(body.pets === true){
    picsPets += '&pets=Y'
  }
  if(body.photos === true){
    picsPets += '&pics=Y'
  }
  let result = [];
  let object = {filter_uuid: body.uuid};
  let url = `http://www.rentalsource.com/rentals/${body.state}/${body.city}/?min=${body.min}&max=${body.max}&beds=${body.beds}&baths=${body.baths}&types%5B%5D=hous&types%5B%5D=apt&types%5B%5D=town&types%5B%5D=cond&types%5B%5D=vac${picsPets}&pos=0&sortby=updated&orderby=asc`
  request(url, (err, res, body) => {
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body);
      $('.ptb5 a[href]').each(function(){
        var url = this.attribs.href
        if(result.indexOf(url) === -1){
          result.push(url)
        }
      })
      object.links = JSON.stringify(result);
      console.log(object.links)
      knex('links')
        .where('filter_uuid', object.filter_uuid)
        .then((links) => {
          console.log(links);
          if(!links[0]){
            console.log('there are no links here')
            return knex('links').insert(object, '*');
          }else if (links.links !== result){
            console.log('above')
            console.log(links.links);
          }
        })
        .catch((err) => {
          console.log(err);
        })
      return;
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

module.exports = router


// console.log(links)

          // let options = {
          //   url:'https://rent-finder.herokuapp.com/notifyuser',
          //   headers: {
          //     'Content-type':'application/json'
          //   },
          //   body: JSON.stringify(body)
          // }

          // if(!links[0]){
          //   console.log('inside if statement inside knex search')
          //   request(options, (err, res, body) => {
          //     if (err){
          //       return console.log(err);
          //     }
          //     console.log('good');
          //   })
          //   return knex('links').insert(object, '*')
          // }else if (links.links !== result){
          //   console.log('inside if statement inside knex search')
          //   request(options, (err, res, body) => {
          //     if (err){
          //       return console.log(err);
          //     }
          //     console.log('good');
          //   })
          //   return knex('links').insert(object, '*')
          // }
          // console.log('nothing new')