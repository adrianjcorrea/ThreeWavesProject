import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home.js';
const Routes = () => {

  return (
    <div>
      <Switch>
        <Route path='/' component={ Home } />
        <Route />
      </Switch>
    </div>
  );
}  

export default Routes;
