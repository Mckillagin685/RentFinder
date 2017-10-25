var payloads = require("./payloads")


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
  // console.log("callbackId ", callbackId)
  // console.log("id ", incomingPayload.actions[0].name)

  switch(true){
    case id === "location":
      var campus = parseInt(incomingPayload.actions[0].value);
      newFilter = location(campus)
      payload = payloads.bed
      payload.attachments[0].callback_id = JSON.stringify(newFilter)
      // console.log(payload)
      break;
    case id === "beds":
      callbackId.beds = bedOrBath(incomingPayload.actions[0].value)
      payload = payloads.bath
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
      let max = incomingPayload.actions[0].selected_options[0].value
      let min = callbackId.min
      payload = minOrMax(min, max, callbackId);
      break;
    case id === "pet":
      console.log(incomingPayload)
      payload = {
        "text": "end of prompt" 
      }
      // payload = payloads.photo
      // payload.attachments.filter = filter
      break;
    case id === "photo":
      payload = {
        "text": "end of prompt" 
      }
      // console.log(filter)
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
  var result;
  if (min < max){
    callbackId.max = max;
    result = payloads.pet;
    payload.attachments[0].callback_id = JSON.stringify(callbackId);
  }else{
    result = payloads.minRentTryAgain;
    result.attachments[0].callback_id = JSON.stringify(callbackId);
  }
  return result;
}


module.exports = {
  location,
  bedOrBath,
  createFilterPrompt
}