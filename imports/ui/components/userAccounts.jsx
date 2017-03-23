import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
// import Accounts from 'meteor/std:accounts-basic';

import {
	TextField,
	RaisedButton

} from 'material-ui'

import { 
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';

import PopUp from '/imports/ui/components/Tools/PopUp.jsx'

const userAccounts = React.createClass({ 

	getInitialState(){
		return{
			username: '',
			password: '',
		}
	},

	handleUserName: function(event){
		this.setState({username: event.target.value});
		console.log(this.state.username)
	},

	handlePassword: function(event){
		this.setState({password: event.target.value});
		console.log(this.state.password)
	},

	loginFail(err){
		console.log("loginFail called..");
		<PopUp text={err} modal={false} />
	},

	handleLogin(){
		console.log("Attempting to logIn....")
		var pass = this.state.password;
		var username = this.state.username;
		var that = this;
		if(pass !== '' && username !== ''){
			console.log("meteor login..")
			Meteor.loginWithPassword(username, pass, function(err) {
  				if (err) {
  					console.log("Login failed " + err.message)
			    	that.loginFail(err.message);
				}else{
			  	console.log("Successful Login!")
			  	browserHistory.push('/');
			  }
			});
		}else{
			console.log("put a password & username in!")
		}
	},

	haveAccSwitch(){
		switchA = function(event) {
			browserHistory.push('/register');
		}
		return switchA
	},

	rootHome : function () {
		browserHistory.push('/');
	},

	render : function () {
		var haveAcc = this.state.haveAcc;
	  	return(	
			<div style={{height: '100%', width: '100%'}}>
				<div>
					<div className="loginContain">
						<div className="loginField">
							Need an account? <RaisedButton backgroundColor={lightGreenA200} onTouchTap={this.haveAccSwitch()} label="Register" />
						</div>

						<div className="loginField">
							<TextField
								hintText="Enter Your Username..."
								floatingLabelText="Username"
								value={this.state.username}
								onChange={this.handleUserName}
								fullWidth={true}
							/>
						</div>

						<div className="loginField">
							<TextField
								type="password"
								hintText="Enter Your Password..."
								floatingLabelText="Password"
								value={this.state.password}
								onChange={this.handlePassword}
								fullWidth={true}
							/>
						</div>

						<div className="loginField"> </div>

						<div className="loginField">
							<RaisedButton
								label="Login"
								onTouchTap={this.handleLogin}
								fullWidth={true}
								style={{width: '100%', backgroundColor: lightGreenA200 }}
								backgroundColor={lightGreenA200}
							/>
						</div>
					</div>
				</div>
			</div>
	  	);
	  }
	});
export default userAccounts;