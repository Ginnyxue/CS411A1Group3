import React, {Component} from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {sendTestRequest} from "./api";

class JobForms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      results: []
    };
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    });
  };

  handleSubmit = (event) => {
    sendTestRequest(this.state.search).then(json => {
      console.log(json);

      const serverResults = JSON.parse(json.data);
      this.setState({
        results: serverResults.jobs
      });


    });

    event.preventDefault();
  };

  render() {


    const columns = [
      {
        header: 'Company',
        accessor: 'company'
      },
      {
        header: 'Title',
        accessor: 'title'
      },
      {
        header: 'Location',
        accessor: 'locations'
      },
      {
        header: 'Salary',
        accessor: 'salary'
      }
    ];


    return (<div>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.search}
          onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
      {this.state.search}
      <ReactTable
        data={this.state.results}
        columns={columns}
      />
    </div>);
  }
}

export default JobForms;