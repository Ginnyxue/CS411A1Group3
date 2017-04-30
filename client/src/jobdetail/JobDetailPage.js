import React, {Component} from "react";
import {sendGetJobRequest} from "../api";
import NavBar from "../NavBar";

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
          Job Detail Page
          <pre>
          {JSON.stringify(this.state.job, null, 2)}
        </pre>
        </div>
      </div>
    );
  }
}

export default JobDetailPage;
