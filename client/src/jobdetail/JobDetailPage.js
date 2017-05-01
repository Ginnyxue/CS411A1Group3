import React, {Component} from "react";
import {sendGetJobRequest} from "../api";
import NavBar from "../NavBar";
import { Header, Segment } from 'semantic-ui-react'
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from "react-google-maps";

class JobDetailPage extends Component {
  constructor(props) {
    super(props);
    

    let id = this.props.match.params.id;
    this.state = {
      id: id,
      job: {}
    };
  }

  componentDidMount() {
    sendGetJobRequest(this.state.id).then((res) => {
      console.log(res);
      this.setState({
        job: res.job
      });
    });
  }

  render() {
    return (
      <div style={{
        flex: 1,
        display: "flex",
        flexFlow: "column",
      }}>
        <NavBar/>
        <div style={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
          padding: 20
        }}>
         <Header as='h2' attached='top'>
      Job Detail
    </Header>
    <Segment attached>
    <p>{this.state.job.company}</p>
      <p>Job Title: {this.state.job.jobtitle}</p>
          <p>Location: {this.state.job.formattedLocationFull}</p>
          <p>Description: {this.state.job.snippet}</p> 
          <a href = {this.state.job.url}>Explore More</a>
          <p></p>
    </Segment>
          <p></p>
          
        </div>
      </div>
    );
  }
}

export default JobDetailPage;
