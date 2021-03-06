var urlConfig = require('./slack-pads.config.js');
var dataChecks = require('./dataChecks');
var payloads = require('./payloads');
var knex = require('./knex');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
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

const checkNumMax = function(req, res, next) {
  var userName = req.body.user_name;

  let options = {
    url: `${urlConfig.deployUrl}numfilters`,
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({user_name: userName})
  }

  request.get(options, (err, response, body) => {
    if(err){
      console.log(err);
      return;
    }
    var parsedBody = JSON.parse(response.body)
    if(parsedBody[0] >= 4){
      return res.send(payloads.tooManyFilters).end()
    }

    next()
  })

};

const checkNumMin = function(req, res, next) {
  var userName = req.body.user_name;

  let options = {
    url: `${urlConfig.deployUrl}numfilters`,
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({user_name: userName})
  }

  request.get(options, (err, response, body) => {
    if(err){
      console.log(err);
      return;
    }
    var parsedBody = JSON.parse(response.body)
    if(parsedBody[0] <= 0){
      return res.send(payloads.noFilters).end()
    }

    next()
  })

};

app.get('/', function (req, res) {res.status(200).send('Hello World!'); });

app.post('/test', function(req, res, next){
  
})

app.post('/listresults', function(req, res, next){
  var userName = req.body.user_name;
  var filterId = parseInt(req.body.text);

  let options = {
    url: `${urlConfig.deployUrl}listlinks`,
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({user_name: userName, filter_id: filterId})
  }

  request.get(options, (err, response, body) => {
    if(err){
      console.log(err);
      return;
    }

    var attachmentText = dataChecks.linksToText(body);
    console.log(attachmentText)
    var botPayload = {
      "text": `Here are your results for filter ${filterId}.`,
      "attachments":[
        {
          "text": attachmentText
        }
      ]
    }
    return res.send(botPayload);
  })
}) 

app.get('/api/startscan', function(req, res, next){
  console.log('in /api/startscan')
  var filters;
  knex('filters')
    .where('notify', true)
    .then((filters) => {
      for(let filter of filters){

        let options = {
          url: `${urlConfig.deployUrl}scheduledscraper`,
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

app.post('/listfilters', checkNumMin, function(req, res, next){
  var filterNum = req.body.text;
  var userName = req.body.user_name;
  var reqObject = {user_name: userName};
  const fields = [];

  let options = {
    url: `${urlConfig.deployUrl}filters`,
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify(reqObject)
  }

  request.get(options, (err, response, body) => {
    if(err){
      console.log(err);
      return;
    }
    var resbody = JSON.parse(body);
    for (let filter of resbody){
      var field = {
        "title":`Filter ${filter.id}`,
        "value":`Place: ${filter.city}, ${filter.state}, \n Beds: ${filter.beds}, \n baths: ${filter.baths}, \n Price range: $${filter.min}-$${filter.max}, \n pet friendly: ${filter.pet_friendly}, \n Show only photos: ${filter.photo}, \n notifications on: ${filter.notify}`,
        "short":true
      }
      fields.push(field);
    }

    var botPayload = {
      "text":"Here are your filters",
      "attachments":[
        {
          "fields": fields
        }
      ]
    }

    console.log(botPayload)

    if(userName !== 'rentbot'){
      return res.status(200).json(botPayload);
    }else{
      return res.status(200).end();
    }
  })
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


app.post('/createfilter', checkNumMax, function(req, res, next){
  var userName = req.body.user_name;
  var botPayload = payloads.location;

  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});

app.post('/deletefilter', checkNumMin,function(req, res, next){
  var userName = req.body.user_name;
  var filterNum = parseInt(req.body.text);

  let options = {
    url: `${urlConfig.deployUrl}filter`,
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({user_name: userName, filter_id: filterNum})
  }

  request.delete(options, (err, response, body) => {
    if(err){
      console.log(err);
    }
    response.statusCode(200).end();
  })
  botPayload = {
    "text":"Filter deleted"
  }
  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
  }
});

app.post('/help', (req, res, next) => {
  var userName = req.body.user_name; 
  var botPayload= payloads.help;

  if(userName !== 'rentbot' && req.body.channel_name === 'directmessage'){
    return res.status(200).json(botPayload);
  }else{
    return res.status(200).end();
}
})

app.listen(port, function(){
  console.log('Listening on port ' + port);
})

module.exports = app