import React, {ReactDOM} from "react";

class PlacesSearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      value: target.value
    });
    this.props.onPlacesChanged(this.input.value);
  };

  onPlacesChanged = () => {
    // Update the state as input has been changed by the Google api
    this.setState({
      value: this.input.value
    });

    this.props.onPlacesChanged(this.input.value);
  };

  componentDidMount() {
    this.searchBox = new google.maps.places.SearchBox(this.input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }

  componentWillUnmount() {
    if (this.searchBox) {
      //this.searchBox.removeListener('places_changed', this.onPlacesChanged);
    }
  }

  render() {
    return (<input
      ref={node => this.input = node}
      type="text"
      name="value"
      value={this.state.value}
      onChange={this.handleInputChange}
    />);
  }
}

PlacesSearchBox.propTypes = {
  initialValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onPlacesChanged: React.PropTypes.func.isRequired
};

export default PlacesSearchBox;
