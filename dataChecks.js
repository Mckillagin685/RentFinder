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
  console.log("callbackId ", callbackId)
  console.log("id ", incomingPayload.actions[0].name)

  switch(true){
    case id === "location":
      var campus = parseInt(incomingPayload.actions[0].value);
      newFilter = location(campus)
      payload = payloads.bed
      payload.attachments[0].callback_id = JSON.stringify(newFilter)
      // console.log(payload)
      break;
    case id === "beds":
      newFilter.beds = incomingPayload.actions[0].value
      unstrungFilter = Object.assign(callbackId, newFilter)
      payload = payloads.bath
      payload.attachments[0].callback_id = JSON.stringify(unstrungFilter);
      break;
    case id === "baths":
      console.log(incomingPayload)
      payload = {
        "text": "end of prompt" 
      }
      // payload = payloads.minRent
      // payload.attachments.filter = filter
      break;
    case id === "minRent":
      payload = payloads.maxRent
      // payload.attachments.filter = filter
      break;
    case id === "maxRent":
      payload = payloads.pet
      // payload.attachments.filter = filter
      break;
    case id === "pet":
      payload = payloads.photo
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


module.exports = {
  location,
  bedOrBath,
  createFilterPrompt
}