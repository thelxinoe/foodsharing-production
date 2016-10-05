import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Accounts from 'meteor/std:accounts-ui';

const Login = React.createClass({

      shouldComponentUpdate(nextProps, nextState){
      				       return false
      },

      shouldComponentUpdate(nextProps, nextState){
							       return false;
      },


	handleLogin : function () {
		this.router.push('/');
	},

	render : function () {
	  	return(
		    <div>
		    	<Accounts.ui.LoginForm  />
		    </div>
	  	);
	  }
	});
export default Login;
