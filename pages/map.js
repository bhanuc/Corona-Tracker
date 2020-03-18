import Head from "next/head";
import React from "react";
import algoliasearch from "algoliasearch";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import HeaderComponent from "../components/baseHeader";

const client = algoliasearch("PYRN2P2666", "4cde6a799267316bf3e705219c545b5b");

const index = client.initIndex("corona-test-centers");

function get_location() {}

class Home extends React.Component {
  state = {
    centers: [],
    location: { lat: 12.9852, lng: 77.6433 },
    address: "",
    search: ""
  };

  componentDidMount = async () => {
    const resp = await index.search("", {
      aroundLatLng: "13.6379369,79.3864022"
    });
    this.setState({ centers: resp.hits });
  };

  getCurrentLocation = async pos => {
    console.log(pos);
    //navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };

  handleChange = async ({ lat, lng }) => {
    const resp = await index.search("", {
      aroundLatLng: `${lat},${lng}`
    });
    this.setState({ centers: resp.hits, location: { lat, lng } });
  };
  render() {
    return (
      <div className="bg-gray-100 font-sans leading-normal tracking-normal">
        <HeaderComponent handleChange={this.handleChange} heading="Map" />
        <Map center={[lat, lng]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default Home;
