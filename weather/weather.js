const request = require("request");

const apikey = "382fb6872fdc0f096a50dee1346da4ac";

const getWeather = (latitude, longitude, callback) => {
  request(
    {
      url: `https://api.forecast.io/forecast/${apikey}/${latitude},${longitude}`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to forecast.io servers");
      } else if (response.statusCode === 400) {
        callback("Unable to fetch weather");
      } else if (response.statusCode === 400) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    }
  );
};

module.exports.getWeather = getWeather;
