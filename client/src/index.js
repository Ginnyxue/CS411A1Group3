import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";

import App from "./App";
import SearchPage from "./search/SearchPage";
import JobListPage from "./JobListPage";
import JobForms from "./JobForms";
import NavBar from "./NavBar";


render(
  (<BrowserRouter>
    <div style={{
      height: "100%",
      display: "flex",
      flexFlow: "column",
    }}>
      <NavBar/>
      <Route exact path="/" component={App}/>
      <Route path="/search" component={SearchPage}/>
      <Route path="/jobs" component={JobListPage}/>
      <Route path="/forms" component={JobForms}/>
    </div>
  </BrowserRouter>),
  document.querySelector('#app'));
