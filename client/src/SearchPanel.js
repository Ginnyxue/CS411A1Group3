import React, {Component} from "react";

import {parse as parseQuery} from 'query-string';

const FIELD_JOB = "job";
const FIELD_LOCATION = "location";

class SearchPanel extends Component {
  constructor(props) {
    super(props);

    let queryParams = parseQuery(this.props.searchQuery);
    this.state = {
      [FIELD_JOB]: (queryParams[FIELD_JOB] ? queryParams[FIELD_JOB] : ""),
      [FIELD_LOCATION]: (queryParams[FIELD_LOCATION] ? queryParams[FIELD_LOCATION] : "")
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state[FIELD_JOB] && this.state[FIELD_LOCATION]) {
      this.props.onSubmit(this.state);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const fieldName = target.name;
    this.setState({
      [fieldName]: value
    });
  };

  render() {
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Job
          <input
            name={FIELD_JOB}
            type="text"
            value={this.state[FIELD_JOB]}
            onChange={this.handleInputChange}/>
        </label>
        <label>
          Location
          <input
            name={FIELD_LOCATION}
            type="text"
            value={this.state[FIELD_LOCATION]}
            onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>);
  }
}

SearchPanel.propTypes = {
  searchQuery: React.PropTypes.string.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default SearchPanel;
