const mongoose = require("mongoose");
const db =
  "mongodb+srv://khaishian:khaishian@mongodb-n1s1q.mongodb.net/weather?retryWrites=true&w=majority";

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
  

const CountryWeather = mongoose.model("weather", schema, "WeatherCollection");

module.exports = CountryWeather;
