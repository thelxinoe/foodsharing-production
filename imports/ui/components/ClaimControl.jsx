import React from 'react';

import { FlatButton, Snackbar } from 'material-ui';

import NumberOptions from './NumberOptions';

const ClaimControl = React.createClass({

	getInitialState() {
		return {
			claimAccepted: false,
			claimSnackbar: false,
			portionClaim: 0,
			claimMessage: "Please choose some portions to claim."
		};
	},

	makeClaim: function() {
		//put the actual claims code here
	},

	getPortionClaim(value){
		this.setState({portionClaim:value});
	},

	handleSnackbarClose(){
		this.setState({claimSnackbar:false})
	},

	render() {
		return (
			<div>

				<NumberOptions
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
