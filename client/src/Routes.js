import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home.js';
import Layout from './components/hoc/Layout.js';

const Routes = () => {

  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={ Home } />
      </Switch>
    </Layout>
  );
}  

export default Routes;
