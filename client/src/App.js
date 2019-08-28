import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import RSVP from './pages/rsvp';
import Details from './pages/details';
import Home from './pages/home';
import Gifts from './pages/gifts';
import OrderOfService from './pages/orderOfService';
import Menu from './pages/menu';
import BridalParty from './pages/bridalParty';
import MyNavbar from './components/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Details" component={Details} />
          <Route path="/RSVP" component={RSVP} />
          <Route path="/Gifts" component={Gifts} />
          <Route path="/OrderofService" component={OrderOfService} />
          <Route path="/Menu" component={Menu} />
          <Route path="/BridalParty" component={BridalParty} />
        </Switch>
      </div>
    );
  }
}

export default App;
