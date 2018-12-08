const request = require("request");
const yargs = require("yargs");

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

var encodedAddress = encodeURIComponent(argv.address);

request(
  {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  },
  (error, response, body) => {
    if (error) {
      console.log("unable to connect to google service");
    } else if (body.status === "ZERO_RESULTS") {
      console.log("unable to cfind that address");
    } else if (body.status === "200") {
      console.log(JSON.stringify(body, "", undefined, 2));
      console.log(`Address: ${body.results[0].formatted_address}`);
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  }
);
