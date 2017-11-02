var location = {
  "text": "What campus are you attending?",
  "attachments": [
      {
          "text": "Choose your current campus",
          "fallback": "You are unable to choose a campus",
          "callback_id": "location",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "location",
                  "text": "Austin, TX",
                  "type": "button",
                  "value": 78701
              },
              {
                  "name": "location",
                  "text": "Boulder, CO",
                  "type": "button",
                  "value": 80302
              },
              {
                  "name": "location",
                  "text": "Denver, CO (Platte)",
                  "type": "button",
                  "value": 80202
              },
              {
                  "name": "location",
                  "text": "Denver, CO (Golden Triangle)",
                  "type": "button",
                  "value": 80204
              },
              {
                  "name": "location",
                  "text": "New York, NY",
                  "type": "button",
                  "value": 10013
              },
              {
                  "name": "location",
                  "text": "Phoenix, AZ",
                  "type": "button",
                  "value": 85004
              },
              {
                  "name": "location",
                  "text": "San Francisco, CA",
                  "type": "button",
                  "value": 94105
              },
              {
                  "name": "location",
                  "text": "Seattle, WA",
                  "type": "button",
                  "value": 98104
              }
          ]
      }
  ]
};

var bed = {
  "text": "How many bedrooms would you like?",
  "attachments": [
      {
          "text": "Choose number of bedrooms",
          "fallback": "You are unable to choose number of bedrooms",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "beds",
                  "text": "All Beds",
                  "type": "button",
                  "value": 0
              },
              {
                  "name": "beds",
                  "text": "1+",
                  "type": "button",
                  "value": 1
              },
              {
                  "name": "beds",
                  "text": "2+",
                  "type": "button",
                  "value": 2
              },
              {
                  "name": "beds",
                  "text": "3+",
                  "type": "button",
                  "value": 3
              },
              {
                  "name": "beds",
                  "text": "4+",
                  "type": "button",
                  "value": 4
              },
              {
                  "name": "beds",
                  "text": "5+",
                  "type": "button",
                  "value": 5
              }
          ]
      }
  ]
}

var bath = {
  "text": "How many bathrooms would you like?",
  "attachments": [
      {
          "text": "Choose number of bathrooms",
          "fallback": "You are unable to choose number of bathrooms",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "baths",
                  "text": "All Baths",
                  "type": "button",
                  "value": 0
              },
              {
                  "name": "baths",
                  "text": "1+",
                  "type": "button",
                  "value": 1
              },
              {
                  "name": "baths",
                  "text": "1.5+",
                  "type": "button",
                  "value": 1.5
              },
              {
                  "name": "baths",
                  "text": "2+",
                  "type": "button",
                  "value": 2
              },
              {
                  "name": "baths",
                  "text": "2.5+",
                  "type": "button",
                  "value": 2.5
              },
              {
                  "name": "baths",
                  "text": "3+",
                  "type": "button",
                  "value": 3
              },
              {
                  "name": "baths",
                  "text": "3.5+",
                  "type": "button",
                  "value": 3.5
              },
              {
                  "name": "baths",
                  "text": "4+",
                  "type": "button",
                  "value": 4
              }
          ]
      }
  ]
}

var minRent = {
  "text": "What is the minimum price you would like your rent?",
  "attachments": [
      {
          "text": "Choose the minimum rent",
          "fallback": "You are unable to choose the minimum rent",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "minRent",
              "text": "Pick a min price...",
              "type": "select",
              "options": [
                {
                  "text": "$250",
                  "value": 250
                },
                {
                  "text": "$500",
                  "value": 500
                },
                {
                  "text": "$750",
                  "value": 750
                },
                {
                  "text": "$1000",
                  "value": 1000
                },
                {
                  "text": "$1250",
                  "value": 1250
                },
                {
                  "text": "$1500",
                  "value": 1500
                },
                {
                  "text": "$1750",
                  "value": 1750
                },
                {
                  "text": "$2000",
                  "value": 2000
                },
                {
                  "text": "$2500",
                  "value": 2500
                },
                {
                  "text": "$3000",
                  "value": 3000
                },
                {
                  "text": "$3500",
                  "value": 3500
                },
                {
                  "text": "$4000",
                  "value": 4000
                },
                {
                  "text": "$5000",
                  "value": 5000
                },
                {
                  "text": "$6000",
                  "value": 6000
                }
  
            ]
            }
          ]
      }
  ]
}

var maxRent = {
  "text": "What is the maximum price you would like your rent?",
  "attachments": [
      {
          "text": "Choose the maximum rent",
          "fallback": "You are unable to choose the maximum rent",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "maxRent",
              "text": "Pick a max price...",
              "type": "select",
              "options": [
                {
                  "text": "$500",
                  "value": 500
                },
                {
                  "text": "$750",
                  "value": 750
                },
                {
                  "text": "$1000",
                  "value": 1000
                },
                {
                  "text": "$1250",
                  "value": 1250
                },
                {
                  "text": "$1500",
                  "value": 1500
                },
                {
                  "text": "$1750",
                  "value": 1750
                },
                {
                  "text": "$2000",
                  "value": 2000
                },
                {
                  "text": "$2500",
                  "value": 2500
                },
                {
                  "text": "$3000",
                  "value": 3000
                },
                {
                  "text": "$3500",
                  "value": 3500
                },
                {
                  "text": "$4000",
                  "value": 4000
                },
                {
                  "text": "$5000",
                  "value": 5000
                },
                {
                  "text": "$6000",
                  "value": 6000
                },
                {
                  "text": "$6500",
                  "value": 6500
                },
                {
                  "text": "$7000",
                  "value": 7000
                },
                {
                  "text": "$7500",
                  "value": 7500
                },
                {
                  "text": "$8000",
                  "value": 8000
                },
                {
                  "text": "$8500",
                  "value": 8500
                },
                {
                  "text": "$9000",
                  "value": 9000
                },
                {
                  "text": "$9500",
                  "value": 9500
                },
                {
                  "text": "$10000",
                  "value": 10000
                }
                
  
            ]
            }
          ]
          
      }
  ]
}

var pet = {
  "text": "Would you like your rental to be pet friendly?",
  "attachments": [
      {
          "text": "Click a button to choose",
          "fallback": "You are unable to choose",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "pet_friendly",
                  "text": "Pet friendly",
                  "type": "button",
                  "value": "1"
              },
              {
                  "name": "pet_friendly",
                  "text": "both non pet and pet friendly",
                  "type": "button",
                  "value": "0"
              }
          ]
      }
  ]
}

var photo = {
  "text": "Would you like me to show you rentals only with photos?",
  "attachments": [
      {
          "text": "Click a button to choose",
          "fallback": "You are unable to choose",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "photos",
                  "text": "Only with photos",
                  "type": "button",
                  "value": true
              },
              {
                  "name": "photos",
                  "text": "Both with or without photos",
                  "type": "button",
                  "value": false
              }
          ]
      }
  ]
}

var notify = {
  "text": "Would you like me to notify you every other hour IF I find something new?",
  "attachments": [
      {
          "text": "Click a button to choose",
          "fallback": "You are unable to choose",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
              {
                  "name": "notify",
                  "text": "Notify me",
                  "type": "button",
                  "value": true
              },
              {
                  "name": "notify",
                  "text": "Do not Notify me",
                  "type": "button",
                  "value": false
              }
          ]
      }
  ]
}

var minRentTryAgain = {
  "text": "Minimum price must be less than maximum price?",
  "attachments": [
      {
          "text": "Choose the minimum rent",
          "fallback": "You are unable to choose the minimum rent",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "minRent",
              "text": "Pick a min price...",
              "type": "select",
              "options": [
                {
                  "text": "$250",
                  "value": 250
                },
                {
                  "text": "$500",
                  "value": 500
                },
                {
                  "text": "$750",
                  "value": 750
                },
                {
                  "text": "$1000",
                  "value": 1000
                },
                {
                  "text": "$1250",
                  "value": 1250
                },
                {
                  "text": "$1500",
                  "value": 1500
                },
                {
                  "text": "$1750",
                  "value": 1750
                },
                {
                  "text": "$2000",
                  "value": 2000
                },
                {
                  "text": "$2500",
                  "value": 2500
                },
                {
                  "text": "$3000",
                  "value": 3000
                },
                {
                  "text": "$3500",
                  "value": 3500
                },
                {
                  "text": "$4000",
                  "value": 4000
                },
                {
                  "text": "$5000",
                  "value": 5000
                },
                {
                  "text": "$6000",
                  "value": 6000
                }
  
            ]
            }
          ]
      }
  ]
}


module.exports = {
  location,
  bed,
  bath,
  minRent,
  maxRent,
  pet,
  photo,
  notify,
  minRentTryAgain,
}