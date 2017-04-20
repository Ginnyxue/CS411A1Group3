import React, {Component, PropTypes} from "react";
import {Form, Checkbox, Segment} from "semantic-ui-react";
import PlacesSearchBox from "./PlacesSearchBox";


class SearchPanel extends Component {
  constructor(props) {
    super(props);

    let job = this.props.initialValues.job;
    let location = this.props.initialValues.location;
    this.state = {
      job: (job ? job : ""),
      location: (location ? location : ""),
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.job && this.state.location) {
      this.props.onSubmit(this.state.job, this.state.location);
    }
  };

  handleInputChange = (event, data) => {
    this.setState({
      [data.name]: (data.type === "checkbox" ? data.checked : data.value)
    });
  };

  handleLocationChanged = (data) => {
    this.setState({
      location: data
    });
  };

  render() {
    return (<Segment>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input label='Job'
                      type='text'
                      name="job"
                      value={this.state.job}
                      onChange={this.handleInputChange}
          />
          <Form.Field>
            <label>Location</label>
            <PlacesSearchBox
              placeholder="Enter a place"
              initialValue={this.state.location}
              onPlacesChanged={this.handleLocationChanged}/>
          </Form.Field>
        </Form.Group>
        <Form.Button>Search</Form.Button>
      </Form>
    </Segment>);
  }
}

SearchPanel.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default SearchPanel;
