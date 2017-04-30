import React, {Component, PropTypes} from "react";
import {Menu} from "semantic-ui-react";
import {isLoggedIn, logOut} from "./api";

class NavBar extends Component {
  constructor(props) {
    super(props);

    let location = window.location.pathname.replace("/", "");
    this.state = {
      loggedIn: isLoggedIn(),
      active: location
    };
  }

  handleItemClick = (event, info) => {
    this.context.router.history.push("/" + info.name);
    this.setState({
      active: info.name
    })
  };

  handleLogout = (event, info) => {
    this.context.router.history.push("/");
    logOut();
    this.setState({
      loggedIn: false
    })
  };

  render() {
    return (<div>
      <Menu pointing secondary>
        <Menu.Item name='home'
                   active={this.state.active === 'home'}
                   onClick={this.handleItemClick}/>
        <Menu.Item name='search'
                   active={this.state.active === 'search'}
                   onClick={this.handleItemClick}/>
        {this.state.loggedIn &&
        <Menu.Item name='saved'
                   active={this.state.active === 'saved'}
                   onClick={this.handleItemClick}/>
        }
        <Menu.Menu position='right'>
          {this.state.loggedIn &&
          <Menu.Item name='logout' onClick={this.handleLogout}/>
          }
        </Menu.Menu>
      </Menu>
    </div>);
  }
}

NavBar.contextTypes = {
  router: PropTypes.object
};

export default NavBar;
