import React, {Component} from "react";
import {sendGetJobRequest} from "../api";
import NavBar from "../NavBar";
import { Header, Segment, List } from 'semantic-ui-react'
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

          <p></p>

        </div>
      </div>
    );
  }
}

export default JobDetailPage;
