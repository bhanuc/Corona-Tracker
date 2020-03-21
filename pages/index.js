import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import LocationOn from "@material-ui/icons/LocationOn";

import algoliasearch from "algoliasearch";

import TableComponent from "../components/table";
import PlacesComponent from "../components/places";

import { distance } from "../components/utils";

const client = algoliasearch("PYRN2P2666", "4cde6a799267316bf3e705219c545b5b");

const index = client.initIndex("corona-test-centers");

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

const HomeComponent = () => {
  const classes = useStyles();
  const [results, setResult] = React.useState([]);

  const fillTable = async ({ lat = "13.6379369", lng = "79.3864022" }) => {
    const resp = await index.search("", {
      aroundLatLng: `${lat}, ${lng}`
    });
    const locations = resp.hits.map(({ name, state, _geoloc }) => {
      const dist = distance({ lat, lng }, _geoloc);
      return {
        name,
        state,
        dist,
        _geoloc
      };
    });
    setResult(locations);
  };

  const selecthandler = center => {
    const geoCenter = center ? center._geoloc : {};
    fillTable(geoCenter);
    if (!open) {
      setOptions([]);
    }
  };

  const checkResp = async result => {
    if (!result.coords || !result.coords.latitude) {
      return;
    }
    await fillTable({
      lat: result.coords.latitude,
      lng: result.coords.longitude
    });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(checkResp);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          <TableComponent centers={results} />
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            onClick={getCurrentLocation}
          >
            <LocationOn />
          </Fab>
          <div className={classes.grow} />
          <PlacesComponent selecthandler={selecthandler} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeComponent;
