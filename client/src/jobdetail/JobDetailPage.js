import React, {Component} from "react";
import {sendGetJobRequest} from "../api";
import NavBar from "../NavBar";
<<<<<<< HEAD
import { Header, Segment, List } from 'semantic-ui-react'
import {GoogleMap, InfoWindow, Marker, withGoogleMap} from "react-google-maps";
=======
import {Header, Segment} from "semantic-ui-react";
>>>>>>> f69ae692e329b668292807b681207771662ed3c5

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
<<<<<<< HEAD
         <Header as='h2' attached='top'>
      Job Detail
    </Header>
    <Segment attached>
    
    <List>
    <List.Item>
      <List.Icon name='travel' />
      <List.Content>Job Title: {this.state.job.jobtitle}</List.Content>
    </List.Item>
    <p></p>
    <List.Item>
      <List.Icon name='world' />
      <List.Content>{this.state.job.company}</List.Content>
    </List.Item>
    <p></p>
    <List.Item>
      <List.Icon name='marker' />
      <List.Content>{this.state.job.formattedLocationFull}</List.Content>
    </List.Item>
    <p></p>
    <List.Item>
      <List.Icon name='file text' />
      <List.Content>
        Description: {this.state.job.snippet}
      </List.Content>
    </List.Item>
    <p></p>
    <List.Item>
      <List.Icon name='linkify' />
      <List.Content>
        <a href = {this.state.job.url}>Explore More</a>
      </List.Content>
    </List.Item>
  </List>
      
    </Segment>
=======
          <Header as='h2' attached='top'>
            Job Detail
          </Header>
          <Segment attached>
            <p>{this.state.job.company}</p>
            <p>Job Title: {this.state.job.jobtitle}</p>
            <p>Location: {this.state.job.formattedLocationFull}</p>
            <p>Description: {this.state.job.snippet}</p>
            <a href={this.state.job.url}>Explore More</a>
            <p></p>
          </Segment>
>>>>>>> f69ae692e329b668292807b681207771662ed3c5
          <p></p>

        </div>
      </div>
    );
  }
}

export default JobDetailPage;
