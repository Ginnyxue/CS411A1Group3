import React, {Component} from "react";
import {GoogleMap, Marker, withGoogleMap} from "react-google-maps";
import {sendTestRequest} from "./api";
import {stringify as encodeQuery} from "query-string";
import SearchPanel from "./SearchPanel";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{lat: -25.363882, lng: 131.044922}}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

const BASE_URL = "/search";

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }],
      response: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = (event) => {
    let request = {
      query: this.state.value
    };
    this.placesService.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        if (results.length > 0) {
          let first = results[0];

          const newMarkers = [
            {
              position: {
                lat: first.geometry.location.lat(),
                lng: first.geometry.location.lng()
              },
              key: first.name,
              defaultAnimation: 2,
            }
          ];
          this.setState({
            markers: newMarkers
          });

          let viewport = first.geometry.viewport;
          let bounds = new google.maps.LatLngBounds(viewport.getSouthWest(), viewport.getNorthEast());
          this._mapComponent.fitBounds(bounds);
        }
      }
    });

    sendTestRequest(request.query).then(json => {
      this.setState({
        response: json
      });
    });

    event.preventDefault();
  };

  handleMapLoad = (map) => {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
      console.log(map);
      this.placesService = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    }
  };

  handleMapClick = (event) => {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });

    if (nextMarkers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
  };

  handleMarkerRightClick = (targetMarker) => {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  };

  render() {
    return (<div>
      <h1>Api Prototype</h1>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
      <SearchPanel
        searchQuery={this.props.location.search}
        onSubmit={(data) => {
          let url = BASE_URL + "?" + encodeQuery(data);
          this.props.history.push(url);
        }}/>
      <GettingStartedGoogleMap
        containerElement={
          <div style={{
            height: 600,
            width: 600
          }}/>
        }
        mapElement={
          <div style={{
            height: `100%`
          }}/>
        }
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        onMarkerRightClick={this.handleMarkerRightClick}
      />
      <pre>
        {JSON.stringify(this.state.response, null, 2)}
      </pre>
    </div>);
  }
}

SearchPage.BASE_URL = BASE_URL;

export default SearchPage;