import Head from "next/head";
import React from "react";
import algoliasearch from "algoliasearch";

import TableComponent from "../components/table";
import HeaderComponent from "../components/baseHeader";
import { distance } from "../components/utils";

const client = algoliasearch("PYRN2P2666", "4cde6a799267316bf3e705219c545b5b");

const index = client.initIndex("corona-test-centers");

class Home extends React.Component {
  state = {
    centers: [],
    location: { lat: 13.6379369, lng: 77.6433 },
    address: "",
    search: ""
  };

  componentDidMount = async (lat = "13.6379369", lng = "79.3864022") => {
    const resp = await index.search("", {
      aroundLatLng: "13.6379369,79.3864022"
    });
    const centers = resp.hits.map(({ name, state, _geoloc }) => {
      const dist = distance({ lat, lng }, _geoloc);
      return {
        name,
        state,
        dist
      };
    });
    this.setState({ centers, location: { lat, lng } });
  };

  getCurrentLocation = async pos => {
    console.log(pos);
    //navigator.geolocation.getCurrentPosition(getCurrentLocation);
  };

  handleChange = async ({ lat, lng }) => {
    const resp = await index.search("", {
      aroundLatLng: `${lat},${lng}`
    });
    const centers = resp.hits.map(({ name, state, _geoloc }) => {
      const dist = distance({ lat, lng }, _geoloc);
      return {
        name,
        state,
        dist
      };
    });
    this.setState({ centers, location: { lat, lng } });
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
          <div className="flex flex-wrap mb-4 -mx-2">
            <TableComponent centers={this.state.centers} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
