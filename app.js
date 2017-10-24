var dataChecks = require('./dataChecks');
var payloads = require('./payloads');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {res.status(200).send('Hello World!'); });

app.listen(port, function(){
  console.log('Listening on port ' + port);
})

app.post('/hello', function(req, res, next){
  var userName = req.body.user_name; 
  console.log('log this')
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
  var userName = req.body.user_name;
  var requestText = req.body.text; 
  var callbackId = req.body.callback_id;
  var payload = JSON.parse(req.body.payload);
  var userName = payload.user.name
  var campus = parseInt(payload.actions[0].value);
  let campusText = dataChecks.location(campus);

  var botPayload= {
    text: 'You have chosen ' + campusText
  };

  // return res.status(200).json(botPayload);

  if(userName !== 'rentbot'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});


app.post('/createfilter', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload = payloads.location

  console.log(req.body)

  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});
