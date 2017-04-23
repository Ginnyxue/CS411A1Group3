import React, {Component} from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from "react-google-maps";
import {fitBounds} from "google-map-react/utils";
import {parse as parseQuery, stringify as encodeQuery} from "query-string";
import SearchPanel from "./SearchPanel";
import costs from "../../public/costs.json";
import {Checkbox} from "semantic-ui-react";
import {sendDeleteSavedJobRequest, sendGetAllSavedJobsRequest, sendJobsRequest, sendSaveJobRequest} from "../api";

const BASE_URL = "/search";

const FIELD_JOB = "job";
const FIELD_LOCATION = "location";


// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{lat: -25.363882, lng: 131.044922}}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => {
      let window = <div/>;
      if (marker.infoWindow && marker.key in props.selectedMarkers) {
        window = (
          <InfoWindow>
            <div>
              <h2>{marker.infoWindow.title}</h2>
              <p>{marker.infoWindow.body}</p>
              <Checkbox
                checked={marker.key in props.savedJobs && props.savedJobs[marker.key]}
                onChange={(event, data) => {
                  props.onSaveJob(marker.key, data.checked)
                }}
                label='Save'/>
            </div>
          </InfoWindow>
        );
      }

      return (<Marker
        {...marker}
        onClick={() => props.onMarkerClick(index)}
        onRightClick={() => props.onMarkerRightClick(index)}
      >
        {marker.infoWindow && window}
      </Marker>);
    })}
  </GoogleMap>
));

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.markers = [];
    this.state = {
      center: {
        lat: 40,
        lng: -80
      },
      zoom: 3,
      showCost: true,
      jobs: [],
      markers: [],
      selectedMarkers: {},
      savedJobs: {},
      loading: false
    };
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
    // Don't make requests if already making one
    if (this.state.loading) {
      return;
    }

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

    this.setState({
      jobs: [],
      markers: [],
      selectedMarkers: {},
      loading: true
    });

    // Do a search for the jobs
    sendJobsRequest(job, location).then(results => {
      console.log(results);

      let newJobs = results.jobs;
      let uniqueKeys = new Set();
      newJobs = newJobs.filter(job => {
        let contains = uniqueKeys.has(job.jobkey);
        uniqueKeys.add(job.jobkey);
        return contains == false;
      });

      const newMarkers = newJobs.filter((job) => {
        if (job.latitude && job.longitude) {
          return true;
        }
        return false;
      }).map((job) => {
        let marker = {
          position: {
            lat: job.latitude,
            lng: job.longitude
          },
          key: job.jobkey,
        };

        marker.infoWindow = {
          title: job.jobtitle,
          body: job.snippet
        };

        return marker;
      });

      this.setState({
        jobs: newJobs,
        markers: newMarkers,
        loading: false
      })
    });
  };

  handleMapLoad = (map) => {
    if (map) {
      this.map = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      this.placesService = new google.maps.places.PlacesService(this.map);
      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: this.getPoints(),
        map: this.map,
      });

      let queryParams = parseQuery(this.props.location.search);
      const job = (queryParams[FIELD_JOB] ? queryParams[FIELD_JOB] : "");
      const location = (queryParams[FIELD_LOCATION] ? queryParams[FIELD_LOCATION] : "");
      if (job && location) {
        this.doSearch(job, location);
        this.updateSavedJobsList();
      }
    }
  };

  handleMapClick = (event) => {
  };

  handleMarkerClick = (targetMarker) => {
    let marker = this.state.markers[targetMarker];
    let newSelected = this.state.selectedMarkers;
    newSelected[marker.key] = (marker.key in newSelected ? null : true);
    this.setState({
      selectedMarkers: newSelected
    });
  };

  handleMarkerRightClick = (targetMarker) => {
  };

  getPoints = () => {
    return costs.filter(value => {
      if (value.year === "2011") {
        return true;
      }
      return true;
    }).map(value => {
      return {
        location: new google.maps.LatLng(Number(value.lat), Number(value.lng)),
        weight: Number(value.cost)
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

  handleToggleSaveJob = (jobId, save) => {
    let newSaved = this.state.savedJobs;
    newSaved[jobId] = save;
    this.setState({
      savedJobs: newSaved
    });

    if (save) {
      sendSaveJobRequest(jobId).then((res) => {
        this.updateSavedJobsList();
      });
    } else {
      sendDeleteSavedJobRequest(jobId).then((res) => {
        this.updateSavedJobsList();
      });
    }
  };

  updateSavedJobsList = () => {
    sendGetAllSavedJobsRequest().then((res) => {
      let newSaved = {};
      res.jobs.forEach((job) => {
        newSaved[job.jobkey] = true;
      });
      this.setState({
        savedJobs: newSaved
      });
    });
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
      <GettingStartedGoogleMap
        containerElement={
          <div style={{height: `100%`}}/>
        }
        mapElement={
          <div style={{height: `100%`}}/>
        }
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        markers={this.state.markers}
        selectedMarkers={this.state.selectedMarkers}
        savedJobs={this.state.savedJobs}
        onSaveJob={this.handleToggleSaveJob}
        onMarkerClick={this.handleMarkerClick}
        onMarkerRightClick={this.handleMarkerRightClick}
      />
      <Checkbox
        name="showCost"
        checked={this.state.showCost}
        onChange={this.handleToggleHeatmap}
        label='Show Cost of Living'/>
      <span id="indeed_at">
        <a title="Job Search" href="https://www.indeed.com" rel="nofollow">
            jobs by
          <img alt="Indeed" src="https://www.indeed.com/p/jobsearch.gif" style={{border: 0, verticalAlign: "middle"}}/>
        </a>
      </span>
      {
        (this.state.loading ? "Loading..." : "")
      }
    </div>);
  }
}

SearchPage.BASE_URL = BASE_URL;

export default SearchPage;
