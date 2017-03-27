import React, {Component} from "react";
import {GoogleMap, Marker, withGoogleMap} from "react-google-maps";
import {sendTestRequest} from "./api";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
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

class App extends Component {
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

  handleMapLoad = this.handleMapLoad.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);

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
      if (status == google.maps.places.PlacesServiceStatus.OK) {
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
          var bounds = new google.maps.LatLngBounds(viewport.getSouthWest(), viewport.getNorthEast());
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


  handleMapLoad(map) {
    console.log("Hello! I am here!");
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
      console.log(map);
      this.placesService = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    }
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    console.log("Hello! I am here! For click");
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
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

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

export default App;
