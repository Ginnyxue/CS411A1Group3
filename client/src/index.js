import React from "react";
import {render} from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";

import SearchPage from "./search/SearchPage";
import JobListPage from "./joblist/JobListPage";
import LoginPage from "./login/LoginPage";
import JobDetailPage from "./jobdetail/JobDetailPage";

render(
  (<BrowserRouter>
    <div style={{
      height: "100%",
      display: "flex",
      flexFlow: "column",
    }}>
      <Route exact path="/" component={LoginPage}/>
      <Route path="/search" component={SearchPage}/>
      <Route path="/saved" component={JobListPage}/>
      <Route path="/job/:id" component={JobDetailPage}/>
    </div>
  </BrowserRouter>),
  document.querySelector('#app'));
