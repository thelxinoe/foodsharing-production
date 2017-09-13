import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import AppHeader from '../../ui/components/AppHeader';
import GridListTab from '../../ui/components/GridListTab';
import UserAccounts from '../../ui/components/UserAccounts';
import UserAccountsRegister from '../../ui/components/UserAccountsRegister';
import MapViewContainer from '../../ui/containers/MapViewContainer';
import YourItemsContainer from '../../ui/containers/YourItemsContainer';
import FoodItemCommentsContainer from '../../ui/containers/FoodItemCommentsContainer';
import ItemCreation from '../../ui/components/ItemCreation';
import FoodItemListContainer from '../../ui/containers/FoodItemListContainer';

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
        path='/ImageItems/:imageID'
        component={FoodItemListContainer}
      />
      <Route
        path='/Login'
        component={UserAccounts}
      />
      <Route
        path='/register'
        component={UserAccountsRegister}
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
        onEnter={requireAuth}
      />
    </Route>
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-target'));
});
