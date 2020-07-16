import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      CountryWeather: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSearchCountryWeather = (value) => {
    axios
      .get(`/getsearchedcountryweather?countryname=${value}`)
      .then((result) => {
        this.setState({ CountryWeather: result.data });
        console.log(this.state.CountryWeather);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    // this.getCountryWeather();
  }

  handleSubmit = async (value) => {
    const query = `/getcountryweather?countrysearch=${value}`;

    console.log(query);

    axios
      .get(query)
      .then((result) => {
        console.log(result);
        // if api return error
        if (result.data.cod === "404") {
          alert("Result Not Found");
        } else {
          this.getSearchCountryWeather(value);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  checkSavedCountry = async (e) => {
    e.preventDefault();
    if (this.input.value === "") {
      alert("Please enter something");
    } else {
      // make first letter of input to uppercase
      var value = this.input.value[0].toUpperCase() + this.input.value.slice(1);
      await axios
        .get(`/getsamecountry?countryname=${value}`)
        .then((result) => {
          console.log(result);
          if (result.data) {
            alert("This country have already been saved before");
          } else {
            this.handleSubmit(value);
          }
        })
        .catch((error) => {
          alert("Error: ", error);
        });
    }
  };

  // deleteRecord = (value) => {
  //   console.log("to delete: ", value);
  //   const query = `/deletecountryweather?countryname=${value}`;
  //   axios
  //     .get(query)
  //     .then((result) => {
  //       this.getSearchCountryWeather();
  //     })
  //     .catch((error) => {
  //       alert("Error: ", error);
  //     });
  // };

  render() {
    var data = this.state.CountryWeather;
    // data = data.reverse();

    return (
      <div className="App">
        <div className="header1">
          <h1 className="title">Weather Checker</h1>
          <br></br>

          <div className="containerSearch">
            <form onSubmit={this.checkSavedCountry}>
              <label><h3>Enter Country Name:</h3></label>
              <input
                type="text"
                class="form-control"
                ref={(input) => (this.input = input)}
              />
              <br></br>
              <input className="reset" type="reset" value="Clear" />
              <input className="searchbtn" type="submit" value="Submit" />
            </form>
            <p />
            <Link to="/manageCountry">
              <button className="button1">Manage</button>
            </Link>
          </div>

          <div>
            <Popup />
          </div>
        </div><br></br>

        <div className="container">
          <div className="col-sm-12">
            {data.map((item) => (
              <div>
                <div class="container">
                  <div class="weather-card one">
                    <div class="top">
                      <div class="wrapper">
                        <h1 class="heading">{item.countryname}</h1>
                        <img src={item.flag} width="100" height="100" />
                        <h3 class="location">{item.weathermain}</h3>
                        <p class="temp">
                          <span class="temp-value">{item.temperature}</span>
                          <span class="deg">0</span>
                          <a href="javascript:;">
                            <span class="temp-type">C</span>
                          </a>
                        </p>
                        <h3 class="location">
                          Weather Description: {item.weatherdes}
                        </h3>
                        <h3 class="location">Wind Speed: {item.windspeed}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <p />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
