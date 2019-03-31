import React, { Component } from "react";
import axios from "axios";

import Map from "./components/Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchText: ""
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get("https://api.myjson.com/bins/1bgl8a")
      .then(response => this.setState({ data: response.data.chargers }));
  };

  handleSearchChange = event => {
    this.setState({ searchText: event.target.value }, () => {
      if (this.state.searchText) {
        const filter = this.state.data.filter(el => {
          return (
            el.name
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase()) ||
            el.address
              .toLowerCase()
              .includes(this.state.searchText.toLowerCase())
          );
        });
        this.setState({ data: filter });
      } else {
        this.getData();
      }
    });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            Charging Stations
          </a>

          <input
            className="form-control my-2 my-lg-0"
            type="search"
            placeholder="Search by name or address"
            aria-label="Search"
            onChange={this.handleSearchChange}
            value={this.state.searchText}
          />
        </nav>

        <div className="mapid">
          <Map data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
