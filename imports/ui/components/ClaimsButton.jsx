import React, { PropTypes } from 'react'
import { Dialog, FlatButton } from 'material-ui';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';

import ClaimControl from './ClaimControl';

class ClaimsButton extends React.Component {

  constructor() {
    super();
    this.state = {
      claimOpen: false,
    };
    this.openClaim = this.openClaim.bind(this);
    this.closeClaim = this.closeClaim.bind(this);
  }

  openClaim() { this.setState({ claimOpen: true }); }
  closeClaim() { this.setState({ claimOpen: false }); }

  render() {
    const actions = [
      <ClaimControl
        foodID={this.props.foodID}
        portionsLeft={this.props.portionsLeft}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.closeClaim}
      />
    ];
    return (
      <div>
        <ActionShoppingCart onTouchTap={this.openClaim}/>
        <Dialog
          title="Claim!"
          actions={actions}
          modal={true}
          contentStyle={{
            width: '100%',
            maxWidth: 'none',
          }}
          open={this.state.claimOpen}
          >
          How many portions do you wish to claim?
        </Dialog>
      </div>
    );
  }
}

export default ClaimsButton;
