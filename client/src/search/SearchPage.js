import React, {Component} from "react";
import GoogleMapReact from "google-map-react";
import {fitBounds} from "google-map-react/utils";
import {parse as parseQuery, stringify as encodeQuery} from "query-string";
import SearchPanel from "./SearchPanel";
import costs from "../../public/costs.json";
import {Checkbox} from "semantic-ui-react";

const BASE_URL = "/search";

const FIELD_JOB = "job";
const FIELD_LOCATION = "location";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: {
        lat: 51.5,
        lng: 0
      },
      zoom: 11,
      showCost: true
    }
  }

  handleSearch = (job, location) => {
    // Update the url
    let url = BASE_URL + "?" + encodeQuery({
        [FIELD_JOB]: job,
        [FIELD_LOCATION]: location,
      });
    this.props.history.push(url);

    // Perform search
    this.doSearch(job, location);
  };

  doSearch = (job, location) => {
    // Do a search for the location
    let request = {
      query: location
    };
    this.placesService.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Check if we got results
        if (results.length > 0) {
          // Use the first result
          let first = results[0];

          // Extract the viewing bounds for this location
          let viewport = first.geometry.viewport;
          let bounds = new google.maps.LatLngBounds(viewport.getSouthWest(), viewport.getNorthEast());

          // Change the map view to fit the bounds
          this.map.fitBounds(bounds);
        }
      }
    });

    // TODO(doug) - Do a search for the jobs
  };

  handleGoogleMapLoad = ({map, maps}) => {
    this.map = map;
    this.placesService = new google.maps.places.PlacesService(map);
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.getPoints(),
      map: map
    });

    let queryParams = parseQuery(this.props.location.search);
    const job = (queryParams[FIELD_JOB] ? queryParams[FIELD_JOB] : "");
    const location = (queryParams[FIELD_LOCATION] ? queryParams[FIELD_LOCATION] : "");
    if (job && location) {
      this.doSearch(job, location);
    }
  };

  getPoints = () => {
    return costs.map(value => {
      return {
        location: new google.maps.LatLng(value.lat, value.lng),
        weight: value.cost
      };
    });
  };

  handleToggleHeatmap = (event, data) => {
    let value = data.checked;
    this.setState({
      showCost: value
    });
    this.heatmap.setMap(value ? this.map : null);
  };

  render() {
    let queryParams = parseQuery(this.props.location.search);

    return (<div style={{
      flex: 1,
      display: "flex",
      flexFlow: "column",
      padding: 20
    }}>
      <SearchPanel
        initialValues={queryParams}
        onSubmit={this.handleSearch}/>
      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        onGoogleApiLoaded={this.handleGoogleMapLoad}
        yesIWantToUseGoogleMapApiInternals
      >
      </GoogleMapReact>
      <Checkbox
        name="showCost"
        checked={this.state.showCost}
        onChange={this.handleToggleHeatmap}
        label='Show Cost of Living'/>
    </div>);
  }
}

SearchPage.BASE_URL = BASE_URL;

export default SearchPage;
