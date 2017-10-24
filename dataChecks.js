

function location(campus){
  console.log(typeof campus)
  switch (true){
    case campus === 78701:
      campusText = "Austin, TX";
      break;
    case campus === 80302:
      campusText = "Boulder, CO";
      break;
    case campus === 80202:
      campusText = "Denver, CO (Platte)";
      break;
    case campus === 80204:
      campusText = "Denver, CO (Golden Triangle)";
      break;
    case campus === 10013:
      campusText = "New York, NY";
      break;
    case campus === 85004:
      campusText = "Phoenix, AZ";
      break;
    case campus === 94105:
      campusText = "San Francisco, CA";
      break;
    case campus === 98104:
      campusText = "Seattle, WA";
      break;
    default:
      throw('error campus is either not defined or not applicable')
      break;
  }
}


module.exports = {
  location
}