import React, { Component } from 'react';

import LoLNav from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import Champions from './components/Champions'
import Items from './components/Items'
import Matches from './components/Matches'
import Maps from './components/Maps.js'
import Search from './components/Search.js'

import './App.css';
import { Switch, Route } from 'react-router-dom'



const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route path="/champions" component={Champions}/>
      <Route path="/items" component={Items}/>
      <Route path="/matches" component={Matches}/>
      <Route path="/maps" component={Maps}/>
      <Route path="/searchResult=:searchFor" component={Search}/>
    </Switch>
  </main>
)

class App extends Component {

  render() {
    return (
      <div className="App">
        <LoLNav/>
        <Main/>
      </div>
    );
  }
}

export default App;
