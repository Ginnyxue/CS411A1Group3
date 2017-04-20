import React, {Component, PropTypes} from "react";
import {Menu} from "semantic-ui-react";

class NavBar extends Component {
  constructor(props) {
    super(props);

    let location = window.location.pathname.replace("/", "");
    this.state = {
      active: location
    };
  }

  handleItemClick = (event, info) => {
    this.context.router.history.push("/" + info.name);
    this.setState({
      active: info.name
    })
  };

  render() {
    return (<div>
      <Menu pointing secondary>
        <Menu.Item name='search'
                   active={this.state.active === 'search'}
                   onClick={this.handleItemClick}/>
        <Menu.Item name='saved'
                   active={this.state.active === 'saved'}
                   onClick={this.handleItemClick}/>
        <Menu.Menu position='right'>
          <Menu.Item name='logout'/>
        </Menu.Menu>
      </Menu>
    </div>);
  }
}

NavBar.contextTypes = {
  router: PropTypes.object
};

export default NavBar;
