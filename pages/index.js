import Head from "next/head";
import React from "react";
import algoliasearch from "algoliasearch";

import CardComponent from "../components/card";
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
        <HeaderComponent
          handleChange={this.handleChange}
          heading=" Find your nearest Corona Test Center"
          search
        />
        <div className="px-2 pt-40">
          <div className="flex mb-4 -mx-2">
            {this.state.centers.map(center => {
              return (
                <CardComponent
                  key={center.name}
                  location={this.state.location}
                  center={center}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
