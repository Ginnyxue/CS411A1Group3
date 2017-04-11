import React from "react";
import {render} from "react-dom";
import {Link, Route, BrowserRouter} from "react-router-dom";

import App from "./App";
import SearchPage from "./SearchPage";
import JobListPage from "./JobListPage";
import JobForms from "./JobForms";


render(
  (<BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/forms">Forms</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={App}/>
      <Route path="/search" component={SearchPage}/>
      <Route path="/jobs" component={JobListPage}/>
      <Route path="/forms" component={JobForms}/>
    </div>
  </BrowserRouter>),
  document.querySelector('#app'));
