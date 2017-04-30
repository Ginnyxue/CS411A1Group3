import React, {Component} from "react";
import { GoogleLogin } from 'react-google-login-component';
import SearchPage from "../search/SearchPage";
import {Button, Header, Container} from "semantic-ui-react";
import {sendLoginRequest} from "../api";
// import { Segment } from 'semantic-ui-react';
// import introduction from "./introduction.js"

class LoginPage extends Component {
  constructor(props) {
    super(props);
    let location = window.location.pathname.replace("/", "");
    this.state = {
      loggedIn: false,
      active: location
    }; 
  }

  handleItemClick = (event) => {
    this.props.history.push("/search" );
};

  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log({accessToken: id_token});
    sendLoginRequest(id_token);

    //anything else you want to do(save to localStorage)... 
  };


  render() {
    return (
      <div>
      <p/>
      <Container>
        <Header as='h2'>Introduction</Header>
        <p>This Web app is used to search jobs.</p>
        &emsp;&emsp;
        <GoogleLogin socialId="281760633220-2v3ghd8r64na3hocs7snfftp57sisq0g.apps.googleusercontent.com"
                     class="ui button"
                     scope="profile"
                     responseHandler={this.responseGoogle}
                     buttonText=" Login With Google"
                     />
        <p/>
        <Button class="ui button" onClick={this.handleItemClick}>Continue as a Guest</Button>
        </Container>
      </div>
    );
  }
}

// LoginPage.contextTypes = {
//   router: PropTypes.object
// };


export default LoginPage;
