const express = require("express");
const app = express();
const axios = require("axios");
const CountryWeather = require("./CountryWeather");
const PORT = process.env.PORT || 500;

const apikey = "385e80";

//localhost:5000/getcountryweather?title=MovieTitle
app.get("/getcountryweather", (req, res) => {
  const countrysearch = req.query.countrysearch;
  const querystr = `http://api.openweathermap.org/data/2.5/weather?q=${countrysearch}&APPID=13c16ee6b6343286109185633ea968af`;
  const querystr1 = `https://restcountries.eu/rest/v2/name/${countrysearch}`;

  var countryname, temperature, weathermain, weatherdes, windspeed;
  axios
    .get(querystr)
    .then((response) => {
      countryname = response.data.name;
      temperature = (response.data.main.temp - 273.15).toFixed(2); //convert kelvin to celsius
      weathermain = response.data.weather[0].main;
      weatherdes = response.data.weather[0].description;
      windspeed = response.data.wind.speed;

      // console.log("smtg");
      // res.send(response.data);
      axios
        .get(querystr1)
        .then((response) => {
          // var countryWeather = {
          //   countryname: countryname,
          //   temperature: temperature,
          //   weathermain: weathermain,
          //   weatherdes: weatherdes,
          //   windspeed: windspeed,
          //   timezones: response.data[0].timezones[0],
          //   flag: response.data[0].flag,
          // };

          // console.log(JSON.stringify(countryWeather.countryname));
          // res.status(200).json(response.data);

          const countryWeather = new CountryWeather({
            countryname: countryname,
            temperature: temperature,
            weathermain: weathermain,
            weatherdes: weatherdes,
            windspeed: windspeed,
            timezones: response.data[0].timezones[0],
            flag: response.data[0].flag,
          });
          countryWeather
            .save()
            .then((response) => {
              res.status(200).json(response);
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    })
    
});

//localhost:5000/getallmovies
app.get("/getsearchedcountryweather", (req, res) => {
  CountryWeather.find({ countryname: req.query.countryname })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/getallcountryweather", (req, res) => {
  CountryWeather.find({ })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//localhost:5000/getallmovies
app.get("/getsamecountry", (req, res) => {
  CountryWeather.findOne({ countryname: req.query.countryname })
    .then((response) => {
      if (response) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//localhost:5000/deletemovie?title=MovieTitle
app.get("/deletecountryweather", (req, res) => {
  CountryWeather.deleteOne({ countryname: req.query.countryname })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/savecountryweather", (req, res) => {
  const countrysearch = req.query.countrysearch;
  const querystr = `http://api.openweathermap.org/data/2.5/weather?q=${countrysearch}&APPID=13c16ee6b6343286109185633ea968af`;
  const querystr1 = `https://restcountries.eu/rest/v2/name/${countrysearch}`;

  var countryname, temperature, weathermain, weatherdes, windspeed, sunrise;
  axios
    .get(querystr)
    .then((response) => {
      countryname = response.data.name;
      temperature = (response.data.main.temp - 273.15).toFixed(2); //convert kelvin to celsius
      weathermain = response.data.weather[0].main;
      weatherdes = response.data.weather[0].description;
      windspeed = response.data.wind.speed;

      axios
        .get(querystr1)
        .then((response) => {
          const countryWeather = new CountryWeather({
            countryname: countryname,
            temperature: temperature,
            weathermain: weathermain,
            weatherdes: weatherdes,
            windspeed: windspeed,
            timezones: response.data[0].timezones[0],
            flag: response.data[0].flag,
          });
          countryWeather
            .save()
            .then((response) => {
              res.status(200).json(response);
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        })
        .catch((error) => {
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});

if (process.env.NODE_ENV === "production") {
	// Exprees will serve up production assets
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});