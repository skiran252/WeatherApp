const request = require("request");
const weatherapi = (latitude,longitude,callback) => {
    const API_KEY ='cb5ccd32a962f8b70c25d526ae8f1e1c'
    const url = 'https://api.openweathermap.org/data/2.5/onecall?units=metric&lat='+latitude+'&lon='+longitude+'&exclude=hourly,minutely&appid='+API_KEY
    var options = {
      url,
      json:true
    };
    request(options,(error,{body}) => {
          if (error) {
            callback('unable to connect to weather service',undefined)
          } else if (body.error) {
            callback('unable to find location',undefined)
          } else {
            const data=body;
            callback(undefined,
              {
                description:data.daily[0].weather[0].description,
                temp:data.current.temp,
                mintemp:data.daily[0].temp.min,
                maxtemp:data.daily[0].temp.max
              })
          }
          
      });
  
  }
  module.exports=weatherapi