import React, { Component } from 'react';
import logo from './logo.svg';
import LoLNav from './components/NavBar'
import DemoCarousel from './components/Home'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoLNav/>
        <DemoCarousel/>
      </div>
    );
  }
}

export default App;
