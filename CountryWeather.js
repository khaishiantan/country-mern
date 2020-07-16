const mongoose = require("mongoose");
const db =
  "mongodb+srv://khaishian:khaishian@mongodb-n1s1q.mongodb.net/weather?retryWrites=true&w=majority";
  const express = require("express");
  const app = express();
  const path = require("path");


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Mongoose connetion error: ", error);
  });

const schema = mongoose.Schema({
  countryname: { type: String },
  temperature: { type: Number },
  weathermain: { type: String },
  weatherdes: { type: String },
  windspeed: { type: Number },
  timezones: { type: String },
  flag: { type: String },
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}
  

const CountryWeather = mongoose.model("weather", schema, "WeatherCollection");

module.exports = CountryWeather;
