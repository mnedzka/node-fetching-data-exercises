const yargs = require("yargs");
const axios = require("axios");

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "address to fetch weather for"
    }
  })
  .help()
  .alias("help", "h").argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios
  .get(geocodeURL)
  .then(response => {
    if (response.data.status === "ZERO_RESULTS") {
      throw new Error("unable to find that address");
    }

    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.forecast.io/forecast/${apikey}/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted.address);
    return axios.get(weatherURL);
  })
  .then(response => {
    const temperature = response.data.currently.temperature;
    const apparentTemperature = response.data.currently.apparent.temperature;
    console.log(
      `It's currently ${temperature}, It feels like ${apparentTemperature}`
    );
  })
  .catch(e => {
    if (e.code === "ENOTFOUND") {
      console.log("unable to connect to servers");
    } else {
      console.log(e.message);
    }
  });
