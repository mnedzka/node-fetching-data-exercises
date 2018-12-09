const yargs = require("yargs");

const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(result.address);
    weather.getWeather(
      results.latitude,
      results.longitude,
      (erorMessage, weatherResults) => {
        if (erorMessage) {
          console.log(erorMessage);
        } else {
          console.log(
            `It's currently ${weatherResults.temperature}, It feels like ${
              weatherResults.apparentTemperature
            }`
          );
        }
      }
    );
  }
});
