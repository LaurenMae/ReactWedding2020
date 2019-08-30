import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import MyNavbar from './components/navbar';
import { routes } from './routes';

export default function App() {
    return (
      <div className="App">
        <MyNavbar />
        
        <Switch>
          {
            routes.map(({ path, component }, key) => (
              <Route exact path={path} component={component} key={key} />
            ))
          }
        </Switch>
      </div>
    );
}
