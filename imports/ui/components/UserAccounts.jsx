	import React from 'react';
	import ReactDOM from 'react-dom';
	import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
	// import Accounts from 'meteor/std:accounts-basic';

	import {
	TextField,
	RaisedButton,
	Snackbar
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

	const UserAccounts = React.createClass({

	getInitialState(){
	return{
		username: '',
		password: '',
		openErrPop: false,
		errPopMess: '',
		open: false,
		err: '',
	}
	},

	handleOpen: function(err) {
		this.setState({err: err});
		this.setState({open: true});
	},

	handleClose: function() {
	this.setState({open: false});
	},

	handleUserName: function(event){
	this.setState({username: event.target.value});
	},

	handlePassword: function(event){
	this.setState({password: event.target.value});
	},

	loginFailClose(){
	this.setState({openErrPop:false})
	},

	loginFail(err){
	var that = this;
	console.log(err)
	console.log(that)
	that.setState({errPopMess: err, openErrPop: true, username: '', password: ''});
	that.handleOpen()
	},

	handleLogin(){
	console.log("Attempting to logIn....")
	var pass = this.state.password;
	var username = this.state.username;
	var that = this;
		Meteor.loginWithPassword(username, pass, function(err) {
			if (err) {
		    	that.loginFail(err.message);
			}else{
		  	console.log("Successful Login!")
		  	browserHistory.push('/');
		  }
		});
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
	const actions = [
	<FlatButton
	label="OK"
	primary={true}
	keyboardFocused={true}
	onClick={this.handleClose}
	/>,
	];

	return (
	<div>
	<RaisedButton label="Dialog" onClick={this.handleOpen} />
	<Dialog
	  title="Dialog With Actions"
	  actions={actions}
	  modal={false}
	  open={this.state.open}
	  onRequestClose={this.handleClose}
	>
	  {this.state.err} Please try and login again, or register if you don't have an account.
	</Dialog>
	</div>
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
			<Snackbar
	  open={this.state.openErrPop}
	  message={this.state.errPopMess}
	  autoHideDuration={4000}
	  onRequestClose={this.loginFailClose}
	/>
		</div>
		);
	}
	});
	export default UserAccounts;
