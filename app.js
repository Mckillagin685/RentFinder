var dataChecks = require('./dataChecks');
var payloads = require('./payloads');

var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {res.status(200).send('Hello World!'); });

app.listen(port, function(){
  console.log('Listening on port ' + port);
})

app.post('/api/startscan/:id', function(req, res, next){
  if(err){
    return res.send(400).end();
  }else if(req.params.id !== '153j6kl63hsu38'){
    return res.status(401).end();
  }
  return res.send(200).end();
})

app.post('/wakeup', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload= {
    text: 'I\'m up, I\'m up'
  };
  console.log('req.body')

if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
  return res.status(200).json(botPayload);
}else{
  return res.status(200).end();
}
});

app.post('/hello', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload= {
    text: 'Hello ' + userName + ', welcome to Lg Slack channel! Have fun :) '
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
