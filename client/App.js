import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import RSVP from './pages/rsvp';
import Details from './pages/details';
import Home from './pages/home';
import Gifts from './pages/gifts';
import OrderOfService from './pages/orderOfService';
import Menu from './pages/menu';
import BridalParty from './pages/bridalParty';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Home path="/" />
          <Details path="/Details" />
          <RSVP path="/RSVP" />
          <Gifts path="/Gifts" />
          <OrderOfService path="/OrderofService" />
          <Menu path="/Menu" />
          <BridalParty path="/BridalParty" />
        </Router>
      </div>
    );
  }
}

export default App;
