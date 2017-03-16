import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = (event) => {
    alert('Submitted: ' + this.state.value);
    event.preventDefault();
  };

  render() {
    return (<div>
      <h1>Api Prototype</h1>
      <form onSubmit={this.handleSubmit}>
        <input type="text"
               value={this.state.value}
               onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>)
  }
}

export default App;
