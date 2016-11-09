import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppHeader from '../../ui/components/AppHeader.jsx';
import GridListTab from '../../ui/components/GridListTab';
import userAccounts from '../../ui/components/Login/userAccounts';
import userAccountsRegister from '../../ui/components/Login/userAccountsRegister.jsx';
import MapViewContainer from '../../ui/containers/MapViewContainer.jsx';
import YourItemsContainer from '../../ui/containers/YourItemsContainer.jsx';


const requireAuth = function(nextState, replace){
  if(Meteor.userId() == null){
    replace('/Login');
  }
}

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={AppHeader}>
      <IndexRoute component={GridListTab}/>
      <Route
        path='/Login'
        component={userAccounts}
        />
      <Route
        path='/MapView'
        component={MapViewContainer}
        />
      <Route
        path='/YourItems'
        component={YourItemsContainer}
        />
      <Route
        path='/Register'
        component={userAccountsRegister}
        />
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
