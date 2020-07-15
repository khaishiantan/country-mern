import React, { Component } from "react";
import "./App.css";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
import Popup from "react-popup";
import "./Popup.css";
import { Link } from "react-router-dom";

class manageCountry extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllCountryWeather = () => {
    axios
      .get("/getallcountryweather")
      .then((result) => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllCountryWeather();
  }

  //   handleSubmit = async (value) => {
  //     // const checkSavedCountry = await this.checkSavedCountry(this.input.value);
  //     // alert(checkSavedCountry);
  //     const query = `/getcountryweather?countrysearch=${value}`;

  //     console.log(query);

  //     axios
  //       .get(query)
  //       .then((result) => {
  //         console.log(result);
  //         // if api return error
  //         if (result.data.cod === "404") {
  //           alert("Result Not Found");
  //         }
  //         this.getAllCountryWeather();
  //       })
  //       .catch((error) => {
  //         alert("Error: ", error);
  //       });
  //   };

  //   checkSavedCountry = async (e) => {
  //     e.preventDefault();
  //     if (this.input.value === "") {
  //       alert("Please enter something");
  //     } else {
  //       // make first letter of input to uppercase
  //       var value = this.input.value[0].toUpperCase() + this.input.value.slice(1);
  //       await axios
  //         .get(`/getsamecountry?countryname=${value}`)
  //         .then((result) => {
  //           console.log(result);
  //           if (result.data) {
  //             alert("This country have already been saved before");
  //           } else {
  //             this.handleSubmit(value);
  //           }
  //         })
  //         .catch((error) => {
  //           alert("Error: ", error);
  //         });
  //     }
  //   };

  deleteRecord = (value) => {
    console.log("to delete: ", value);
    const query = `/deletecountryweather?countryname=${value}`;
    axios
      .get(query)
      .then((result) => {
        this.getAllCountryWeather();
      })
      .catch((error) => {
        alert("Error: ", error);
      });
  };

  render() {
    var data = this.state.movies;
    data = data.reverse();

    return (
      <div className="App">
        <div className="header1">
          <h1 className="title">Manage Country</h1>
          <br></br>
          <p />
          <Link to="/">
            <button className="button1">Back</button>
          </Link>

          <div>
            <Popup />
          </div>
        </div>
        

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Flag",
                  accessor: "flag",
                  style: { "white-space": "unset" },
                  Cell: ({ row }) => <img src={row.flag} width="100"></img>,
                },
                {
                  Header: "Country",
                  accessor: "countryname",
                },
                {
                  Header: "Weather",
                  accessor: "weathermain",
                  style: { "white-space": "unset" },
                },
                {
                  Header: "Weather Description",
                  accessor: "weatherdes",
                  style: { "white-space": "unset" },
                },
                {
                  Header: "Temperature (°C)",
                  accessor: "temperature",
                },
                {
                  Header: "Wind Speed",
                  accessor: "windspeed",
                  style: { "white-space": "unset" },
                },
                {
                  Header: "Time Zone",
                  accessor: "timezones",
                  style: { "white-space": "unset" },
                },
                {
                  Header: "Delete",
                  accessor: "countryname",
                  Cell: ({ value }) => (
                    <a
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this record"
                          )
                        ) {
                          this.deleteRecord(value);
                        }
                      }}
                    >
                      <button>Deleted</button>
                    </a>
                  ),
                },
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default manageCountry;
