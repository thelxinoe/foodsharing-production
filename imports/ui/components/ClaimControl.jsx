import React from 'react';

import { FlatButton, Snackbar } from 'material-ui';

import NumberOptions from './NumberOptions';

const ClaimControl = React.createClass({

	getInitialState() {
		return {
			claimSnackbar: false,
			portionClaim: 1,
			claimMessage: "Please choose some portions to claim."
		};
	},

	getPortionClaim(value){
		this.setState({portionClaim:value});
	},

	handleSnackbarClose(){
		this.setState({claimSnackbar:false})
	},

	makeClaim(){
		this.props.makeClaim(this.state.portionClaim)
	},

	render() {
		return (
			<div>
				<NumberOptions
					value = {this.state.portionClaim}
					options={this.props.portionsLeft}
					optionChange={this.getPortionClaim}
					/>
				<FlatButton
					label="Claim"
					primary={true}
					onTouchTap={this.makeClaim}/>
				<Snackbar
					open={this.state.claimSnackbar}
					message={this.state.claimMessage}
					autoHideDuration={3600}
					action="Close"
					onTouchTap={this.handleSnackbarClose}
					onRequestClose={this.handleSnackbarClose}/>
			</div>
		);
	}
});
export default ClaimControl;
