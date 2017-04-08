import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import App from './App';
import SearchPage from './SearchPage';

render(
  (<Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={App}/>
      <Route path="/search" component={SearchPage}/>
    </div>
  </Router>), document.querySelector('#app'));
