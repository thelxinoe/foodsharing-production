import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppHeader from '../../ui/components/AppHeader';
import GridListTab from '../../ui/components/GridListTab';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import MapViewContainer from '../../ui/containers/MapViewContainer.jsx';


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
        component={AccountsUIWrapper}
        />
      <Route
        path='/MapView'
        component={MapViewContainer}
        />
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
