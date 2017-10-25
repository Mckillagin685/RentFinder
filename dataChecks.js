var payloads = require("./payloads")


function createFilterPrompt(incomingPayload){
  var callbackId = JSON.parse(incomingPayload.callback_id) || incomingPayload.callback_id
  var oldFilter;
  var filter;
  var payload;
  console.log(callbackId)

  switch(true){
    case callbackId === "location":
      var campus = parseInt(incomingPayload.actions[0].value);
      newFilter = location(campus)
      payload = payloads.bed
      // payload.attachments[0].callback_id = JSON.stringify(["beds",newFilter])
      // console.log(payload)
      break;
    case callbackId === "beds":
      console.log(incomingPayload)
      payload = payloads.bath
      // payload.attachments.filter = filter
      break;
    case callbackId === "baths":
      payload = payloads.minRent
      // payload.attachments.filter = filter
      break;
    case callbackId === "minRent":
      payload = payloads.maxRent
      // payload.attachments.filter = filter
      break;
    case callbackId === "maxRent":
      payload = payloads.pet
      // payload.attachments.filter = filter
      break;
    case callbackId === "pet":
      payload = payloads.photo
      // payload.attachments.filter = filter
      break;
    case callbackId === "photo":
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


module.exports = {
  location,
  bedOrBath,
  createFilterPrompt
}