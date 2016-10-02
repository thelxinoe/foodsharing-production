import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import AppHeader from '../../ui/components/AppHeader';
import GridListTab from '../../ui/components/GridListTab';
import login from '../../ui/components/Login.jsx';

const requireAuth = function(nextState, replace){
    if(Meteor.userId() == null){
  replace('/login');
    }
}

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path='/' component={AppHeader}>
            <IndexRoute component={GridListTab}/>
            <Route path='/Login' component={Login} formState={STATES.SIGN_IN}/>
        </Route>
    </Router>
);
