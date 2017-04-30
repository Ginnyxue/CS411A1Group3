import React, {Component} from "react";
import JobList from "./JobList";
import {isLoggedIn, sendGetAllSavedJobsRequest} from "../api";
import {Header} from "semantic-ui-react";
import NavBar from "../NavBar";

class JobListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    if (!isLoggedIn()) {
      this.props.history.push("/");
    } else {
      sendGetAllSavedJobsRequest().then((res) => {
        this.setState({
          jobs: res.jobs
        });
      });
    }
  }

  handleJobClick = (job) => {
    this.props.history.push("/job/" + job.jobkey);
  };

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
          <Header as="h1">Saved Jobs</Header>
          <JobList
            jobs={this.state.jobs}
            onClick={this.handleJobClick}
          />
        </div>
      </div>
    );
  }
}

export default JobListPage;
