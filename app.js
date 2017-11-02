var dataChecks = require('./dataChecks');
var payloads = require('./payloads');
var knex = require('./knex')
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

const links = require('./routes/links');
const message = require('./routes/message');
const filtersRoutes = require('./routes/filters');

app.use(links);
app.use(message);
app.use(filtersRoutes);

// app.use((_req, res) => {
//   res.sendStatus(404);
// });

// app.use((err, _req, res, _next) => {
//   if (err.output && err.output.statusCode) {
//     return res
//       .status(err.output.statusCode)
//       .set('Content-Type', 'text/plain')
//       .send(err.message);
//   }

//   console.error(err.stack);
//   res.sendStatus(500);
// });

app.get('/', function (req, res) {res.status(200).send('Hello World!'); });



app.get('/api/startscan', function(req, res, next){
  console.log('in /api/startscan')
  var filters;
  knex('filters')
    .where('notify', true)
    .then((filters) => {
      for(let filter of filters){

        let options = {
          url: 'https://rent-finder.herokuapp.com/scheduledscraper',
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify(filter)
        }

        console.log(options.body)

        request.post(options, (err, res, body) => {
          if (!err && res.statusCode === 200) {
            console.log('good');
            return;
          }
          console.log('bad');
          console.log(err);
          return;
        })
      }
    })
    .catch((err) => {
      next(err)
    })

    return res.status(200).end();
})

app.post('/listfilters', function(req, res, next){
  var filterNum = req.body.text;
  var userName = req.body.user_name;
  var reqObject = {user_name: userName};
  var fields = [];
  var botPayload = {};

  let options = {
    url: 'https://rent-finder.herokuapp.com/filters',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(reqObject)
  }

  request.get(options, (err, res, body) => {
    if(err){
      console.log(err);
      return;
    }
    for (let filter in JSON.parse(body)){
      var field = {
        "title":`Filter ${filter.id}`,
        "value":`Place ${filter.city}, ${filter.state}, Beds: ${filter.beds}, baths: ${filter.baths}, Price range ${filter.min}-${filter.max}, \n pet friendly:${filter.pet_friendly}, Show only photos:${filter.photo}, notifications on:${filter.notify}`,
        "short":false
      }
      fields.push(field);
    }
    botPayload = {
      "text":"Here are your filters",
      "fields": fields
    }
  })

  console.log(botPayload)

  if(userName !== 'rentbot'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
})

app.post('/wakeup', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload= {
    'text': 'I\'m up, \n I\'m up'
  };

  console.log(req.body)

if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
  return res.status(200).json(botPayload);
}else{
  return res.status(200).end();
}
});

app.post('/hello', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload= {
    'text': 'Hello ' + userName + ', \n \n welcome to Lg Slack channel! \n \n Have fun :)'
  };

if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
  return res.status(200).json(botPayload);
}else{
  return res.status(200).end();
}
});

app.post('/sayback', function(req, res, next){
  var payload = JSON.parse(req.body.payload);
  var userName = payload.user.name
  var botPayload;

  botPayload = dataChecks.createFilterPrompt(payload) 

  if(userName !== 'rentbot'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});


app.post('/createfilter', function(req, res, next){
  var userName = req.body.user_name;
  var botPayload = payloads.location;

  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});

app.listen(port, function(){
  console.log('Listening on port ' + port);
})

module.exports = app