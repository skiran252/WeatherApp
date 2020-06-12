const request = require("request");
const geocode =(address,callback) =>{

    const API_KEY ='pk.eyJ1Ijoic2Fpa2lyYW4wOCIsImEiOiJja2Jhc3VhYmwwOXFjMnFuMTVnN3JjejVxIn0.vJTDCa0ncMCVHqlR2oBCbQ'
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+API_KEY+'&limit=1'
    request({url,json:true},(error,{body}={})=>{
      if(error) {
        callback('Unable to connect to Geocoding setvice',undefined);
      } else if(body.features.length ===0) {
        callback('No matching location found',undefined);
      } else {
      const longitude = body.features[0].center[0]
      const latitude = body.features[0].center[1]
      const location = body.features[0].place_name
      coordinates={
        latitude: latitude,
        longitude: longitude,
        location:location
      }
      callback(undefined,coordinates)
      }
    })
  }

  module.exports = geocode;