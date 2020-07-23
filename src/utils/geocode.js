const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWxpamFoLWdhYmFzYXUiLCJhIjoiY2tjdnl4enYwMDkyOTJ3cWxuZ2Z0c29raCJ9.LzzhiYFSeocE6PmUwVxSuA&limit=1';

  request({
    url: url,
    json: true
  }, 
  (err, response)=>{
    if(err){
      callback('Unable to connect to location services', undefined);
      return;
    } else if(response.body.features.length === 0) {
      callback('Unable to find location. Try again');
      return;
    }

    callback(undefined, {
      place_name: response.body.features[0].place_name,
      coordinates: response.body.features[0].geometry.coordinates,
    })
  })
}

module.exports = geocode;