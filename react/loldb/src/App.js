import React, { Component } from 'react';

import LoLNav from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Champions from './components/Champions';
import Items from './components/Items';
import Matches from './components/Matches';
import Maps from './components/Maps.js';
import Search from './components/Search.js';
import SweTravelsVis from './components/SweTravelsVis.js'

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/about' component={About} />
      <Route path='/champions' component={Champions} />
      <Route path='/items' component={Items} />
      <Route path='/matches' component={Matches} />
      <Route path='/maps' component={Maps} />
      <Route path='/searchResult=:searchFor' component={Search} />
      <Route path='/SweTravelsVis' component={SweTravelsVis} />
    </Switch>
  </main>
);

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <LoLNav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/about' component={About} />
            <Route path='/champions' component={Champions} />
            <Route path='/items' component={Items} />
            <Route path='/matches' component={Matches} />
            <Route path='/maps' component={Maps} />
            <Route path='/searchResult=:searchFor' component={Search} />
            <Route path='/SweTravelsVis' component={SweTravelsVis} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
