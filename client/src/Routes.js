import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/home/Home.js';
import Layout from './components/hoc/Layout.js';
import RegisterLogin from './components/register&login/RegisterLogin.js';


const Routes = () => {

  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={ Home } />
        <Route path='/Register-login' exact component={ RegisterLogin } />
      </Switch>
    </Layout>
  );
}  

export default Routes;
