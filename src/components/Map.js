import React, { Component } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

import "../App.css";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [59.91673, 10.74782],
      zoom: 12
    };
  }

  changeZoom = e => {
    this.setState({ zoom: 13 });
  };

  handleLocationFound = e => {
    console.log(e.latlng);
    this.setState({
      markers: e.latlng,
      zoom: 14
    });
  };

  render() {
    return (
      <div className="mapid">
        <LeafletMap
          center={this.state.markers}
          zoom={this.state.zoom}
          onclick={this.changeZoom}
          maxZoom={20}
          ref={this.mapRef}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {this.props.data.length > 0 &&
            this.props.data.map(data => {
              return (
                <Marker
                  onclick={this.handleLocationFound}
                  key={data.key}
                  position={data.lnglat}
                >
                  <Popup>
                    <img src={data.img} alt="logo" />
                    Station Name: {data.name} <br />
                    Address: {data.address} <br />
                    Chargers: {data.chargingStations} <br />
                    Opening Hours: {data.openingHours}
                  </Popup>
                </Marker>
              );
            })}
        </LeafletMap>
      </div>
    );
  }
}

export default Map;
