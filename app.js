var dataChecks = require('./dataChecks');
var payloads = require('./payloads');
var knex = require('./knex')
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {res.status(200).send('Hello World!'); });

app.listen(port, function(){
  console.log('Listening on port ' + port);
})

app.get('/api/startscan', function(req, res, next){
  var filters;
  knex('filters')
    .where('notify', true)
    .then((filters) => {
      for(let filter of filters){

        let options = {
          url: 'https://rent-finder.herokuapp.com/scheduledscraper',
          body: JSON.stringify(filter)
        }

        request.post(options, (err, res, body) => {
          if (err) {
            console.log(err);
          }
          console.log(res.body);
        })
      }
    })
    .catch((err) => {
      next(err)
    })

    return res.status(200).end();
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
