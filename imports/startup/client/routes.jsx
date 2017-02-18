import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppHeader from '../../ui/components/AppHeader';
import GridListTab from '../../ui/components/GridListTab';
import ItemCreation from '../../ui/components/ItemCreation';
import AccountsUIWrapper from '../../ui/AccountsUIWrapper';
import MapViewContainer from '../../ui/containers/MapViewContainer';
import YourItemsContainer from '../../ui/containers/YourItemsContainer';
import FoodItemCommentsContainer from '../../ui/containers/FoodItemCommentsContainer';
import ItemCreation from '../../ui/components/ItemCreation';

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
      <Route
        path='/YourItems'
        component={YourItemsContainer}
        onEnter={requireAuth}
      />
      <Route
        path='/FoodComments/:foodID'
        component={FoodItemCommentsContainer}
      />
      <Route
        path='/ItemCreation'
        component={ItemCreation}
      />
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
