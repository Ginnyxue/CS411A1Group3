import React, {Component} from "react";
import {GoogleLogin} from "react-google-login-component";
import {Button, Container, Header} from "semantic-ui-react";
import {isLoggedIn, sendLoginRequest} from "../api";
import NavBar from "../NavBar";
// import { Segment } from 'semantic-ui-react';
// import introduction from "./introduction.js"

class LoginPage extends Component {
  constructor(props) {
    super(props);
    let location = window.location.pathname.replace("/", "");
    this.state = {
      loggedIn: isLoggedIn(),
      active: location
    };
  }

  componentWillMount() {
    if (isLoggedIn()) {
      this.props.history.push("/search");
    }
  }

  handleItemClick = (event) => {
    this.props.history.push("/search");
  };

  responseGoogle = (googleUser) => {
    let id = googleUser.getBasicProfile().getId();
    sendLoginRequest(id).then(() => {
      this.props.history.push("/search");
      this.setState({
        loggedIn: isLoggedIn()
      });
    });
  };

  render() {
    return (
      <div>
        <NavBar/>
        <p/>
        <Container>
          <Header as='h2'>Introduction</Header>
          <p>This Web app is used to search jobs.</p>
          { !isLoggedIn() &&
          <div>
            <GoogleLogin socialId="281760633220-2v3ghd8r64na3hocs7snfftp57sisq0g.apps.googleusercontent.com"
                         class="ui button"
                         scope="profile"
                         responseHandler={this.responseGoogle}
                         buttonText="Login With Google"
            />
            <p/>
            <Button onClick={this.handleItemClick}>Continue as a Guest</Button>
          </div>
          }
        </Container>
      </div>
    );
  }
}

export default LoginPage;
