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
  var campus = payload.actions[0].value;
  var campusText = "";

  switch (true){
    case campus === 78701:
      campusText = "Austin, TX"
      break;
    case campus === 80302:
      campusText = "Boulder, CO"
      break;
    case campus === 80202:
      campusText = "Denver, CO (Platte)"
      break;
    case campus === 80204:
      campusText = "Denver, CO (Golden Triangle)"
      break;
    case campus === 10013:
      campusText = "New York, NY"
      break;
    case campus === 85004:
      campusText = "Phoenix, AZ"
      break;
    case campus === 94105:
      campusText = "San Francisco, CA"
      break;
  }
  
  console.log(payload)

  var botPayload= {
    text: 'You chose ' + campus
  };

  return res.status(200).json(botPayload);

if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
  return res.status(200).json(botPayload);
}else{
  return res.status(200).end();
}
});

app.post('/createfilter', function(req, res, next){
  var userName = req.body.user_name; 
  var botPayload= {
    "text": "What campus are you attending?",
    "attachments": [
        {
            "text": "Choose your current campus",
            "fallback": "You are unable to choose a campus",
            "callback_id": "sayback",
            "color": "#3AA3E3",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "campus",
                    "text": "Austin,TX",
                    "type": "button",
                    "value": "78701"
                },
                {
                    "name": "campus",
                    "text": "Boulder,CO",
                    "type": "button",
                    "value": "80302"
                },
                {
                    "name": "campus",
                    "text": "Denver,CO (Platte)",
                    "type": "button",
                    "value": "80202"
                },
                {
                    "name": "campus",
                    "text": "Denver,CO (Golden Triangle)",
                    "type": "button",
                    "value": "80204"
                },
                {
                    "name": "campus",
                    "text": "New York,NY",
                    "type": "button",
                    "value": "10013"
                },
                {
                    "name": "campus",
                    "text": "Phoenix,AZ",
                    "type": "button",
                    "value": "85004"
                },
                {
                    "name": "campus",
                    "text": "San Francisco,CA",
                    "type": "button",
                    "value": "94105"
                },
            ]
        }
    ]
  };

  console.log(req.body)

  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});
