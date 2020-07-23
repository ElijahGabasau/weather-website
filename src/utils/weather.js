const request = require('request');

const weather = (location, callback) => {
  const url = 'http://api.weatherstack.com/current'
  const apiKey = '1e0e1d60c561090102c2699e0b603215';
  const endpoint = url + '?access_key=' + apiKey + '&query=' + encodeURIComponent(location);

  request({
  url: endpoint,
  json: true,
  },
  (err, response)=>{
    if(err){
      callback('Unable to connect');
      return;
    }else if(response.body.error){
      callback(response.body.error.info);
      return;
    }

    const current = response.body.current;
    const result = `It is ${current.temperature} degrees and ${current.wind_speed} wind speed at ${current.observation_time} in current location, which feels like ${current.feelslike} degrees outside`

    callback(undefined, result)
  });
}

module.exports = weather;