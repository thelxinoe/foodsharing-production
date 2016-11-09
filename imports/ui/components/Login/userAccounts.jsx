import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
	TextField,
	RaisedButton,
	Dialog
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

const errContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

const userAccounts = React.createClass({ 

	getInitialState(){
		return{
			username: '',
			password: '',
			openErrPop: false,
			errPopMess: ''
		}
	},

	handleUserName: function(event){
		this.setState({username: event.target.value});
	},

	handlePassword: function(event){
		this.setState({password: event.target.value});
	},

	loginFail(err){
		console.log("opening pop up error")
		this.setState({errPopMess: err, openErrPop: true, username: '', password: ''})
	},

	handleLogin(){
		console.log("Attempting to logIn....")
		var pass = this.state.password;
		var username = this.state.username;
		var that = this;
		if(pass !== '' && username !== ''){
			Meteor.loginWithPassword(username, pass, function(err) {
  				if(Meteor.userId()) {
					console.log("Successful Login!")
					browserHistory.push('/');
				}else{
					if(err){
						console.log(err.message)
						that.loginFail(err.message);
					}else{
						console.log("Error not detected, but login failed!")
					}
				}
			});
		}else{
			console.log("put a password & username in mate!")
		}
	},

	haveAccSwitch(){
		switchA = function(event) {
			browserHistory.push('/Register');
		}
		return switchA
	},

	rootHome : function () {
		browserHistory.push('/');
	},

	closePop(){
		this.setState({openErrPop: false});
	},

	render : function () {
		var haveAcc = this.state.haveAcc;
		const errActions = [
	    <RaisedButton
			label="OK"
			onTouchTap={this.closePop}
			backgroundColor={lightGreenA200} 
	    />,
	];
	  	return(	
			<div>
				<div style={{height: '100%', width: '100%'}}>
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
				<Dialog
					title="There was a problem with your details:"
					actions={errActions}
					modal={false}
					contentStyle={errContentStyle}
					open={this.state.openErrPop}
				>
					{this.state.errPopMess}
				</Dialog>
			</div>
	  	);
	  }
	});
export default userAccounts;