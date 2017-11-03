var payloads = require("./payloads");
var knex = require('./knex');
var uuid = require('uuid');
var request = require('request');


function createFilterPrompt(incomingPayload){
  var callbackId;
  if(incomingPayload.callback_id === "location"){
    callbackId = incomingPayload.callback_id;
  }else{
    callbackId = JSON.parse(incomingPayload.callback_id);
  }
  var id = incomingPayload.actions[0].name;
  var newFilter = {};
  var unstrungFilter;
  var payload;

  switch(true){
    case id === "location":
      var campus = parseInt(incomingPayload.actions[0].value);
      newFilter = Object.assign(gatherRequestInfo(incomingPayload.team, incomingPayload.channel, incomingPayload.user), location(campus), );
      payload = payloads.bed;
      payload.attachments[0].callback_id = JSON.stringify(newFilter);
      break;
    case id === "beds":
      callbackId.beds = bedOrBath(incomingPayload.actions[0].value);
      payload = payloads.bath;
      payload.attachments[0].callback_id = JSON.stringify(callbackId);
      break;
    case id === "baths":
      callbackId.baths = bedOrBath(incomingPayload.actions[0].value);
      payload = payloads.minRent;
      payload.attachments[0].callback_id = JSON.stringify(callbackId);
      break;
    case id === "minRent":
      callbackId.min = incomingPayload.actions[0].selected_options[0].value;
      payload = payloads.maxRent;
      payload.attachments[0].callback_id = JSON.stringify(callbackId);
      break;
    case id === "maxRent":
      let max = incomingPayload.actions[0].selected_options[0].value;
      let min = callbackId.min;
      payload = minOrMax(min, max, callbackId);
      break;
    case id === "pet_friendly":
      callbackId.pet_friendly = trueOrFalse(incomingPayload.actions[0].value);
      payload = payloads.photo;
      payload.attachments[0].callback_id = JSON.stringify(callbackId);
      break;
    case id === "photos":
      callbackId.photo = trueOrFalse(incomingPayload.actions[0].value);
      payload = payloads.notify;
      payload.attachments[0].callback_id = JSON.stringify(callbackId);
      break;
    case id === "notify":
      callbackId.notify = trueOrFalse(incomingPayload.actions[0].value);
      if(callbackId.notify === true){
        payload = {
          "text": "I will let you know if I find something"
        }
      }else{
        payload = {
          "text": "If you wish to view results use the command /listResults"
        }
      }
      knex('filters')
        .insert(callbackId, '*')
        .catch((err) => {
          console.log(err)
          payload = {
            "text": "Oops something when wrong on our end, \n \n please try again later."
          }
        })
      console.log(callbackId)
      break;
    default:
      throw("Something went wrong")
      break;
  }
  return payload
}

function location(campus){
var result = "";
  switch (true){
    case campus === 78701:
      result = {city:"austin", state:"texas", zip:"78701"};
      break;
    case campus === 80302:
      result = {city:"boulder", state:"colorado", zip:"80302"};
      break;
    case campus === 80202:
      result = {city:"denver", state:"colorado", zip:"80202"};
      break;
    case campus === 80204:
      result = {city:"denver", state:"colorado", zip:"80204"};
      break;
    case campus === 10013:
      result = {city:"new-york",state:"new-york", zip:"10013"};
      break;
    case campus === 85004:
      result = {city:"phoenix", state:"arizona", zip:"85004"};
      break;
    case campus === 94105:
      result = {city:"san-francisco", state:"california", zip:"94105"};
      break;
    case campus === 98104:
      result = {city:"seattle", state:"washington", zip:"98104"};
      break;
    default:
      throw('error campus is either undefined or not applicable')
      break;
  }
  return result;
}

function bedOrBath(b){
  var result = "";
    switch (true){
      case parseInt(b) === 0: 
        result = 0;
        break;
      case typeof parseInt(b) === "number":
        result = b;
        break;
      default:
        throw('error bed or bath is either undefined or not applicable')
        break;
    }
    return result;
  }

function minOrMax(min, max, callbackId){
  console.log(min, max)
  var result;
  if (min > max){
    callbackId.max = max;
    result = payloads.pet;
    result.attachments[0].callback_id = JSON.stringify(callbackId);
  }else{
    result = payloads.minRentTryAgain;
    result.attachments[0].callback_id = JSON.stringify(callbackId);
  }
  return result;
}

function trueOrFalse(value){
  var result;
  if(value === "1"){
    result = true;
  }else{
    result = false;
  }
  return result;
}

function gatherRequestInfo(team, channel, user){
  var result = {};
  // result.team_id = team.id;
  // result.team_domain = team.domain;
  // result.channel_id = channel.id;
  // result.channel_name = channel.name;
  // result.user_id = user.id;
  result.uuid = uuid.v4()
  result.user_name = user.name
  return result;
}

function linksToText (links){
  var parsedLinks = JSON.parse(links);
  var result = " ";
  for(let link of parsedLinks){
    result += `${parsedLinks.indexOf(link) + 1}: <${link}>, \n \n`
  }
  console.log(result)
  return result
}

function compareArrays(arrA, arrB){
  if(arrA.length === arrB.length){
    for (let x = 0; x < arrA.length; x++){
      if(arrA[x] !== arrB[x]){
        return false;
      }
    }
  }else{
    return false;
  }
  return true;
}

module.exports = {
  location,
  bedOrBath,
  createFilterPrompt,
  linksToText,
  compareArrays,
}