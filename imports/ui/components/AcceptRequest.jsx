import React, {PropTypes} from 'react'

import {
  FlatButton,
  Dialog,
} from 'material-ui';

import ClaimControl from './ClaimControl';

import { createMessageClaim } from '../../api/Messages/methods';
import { acceptFoodItemClaim } from '../../api/FoodItems/methods';

class AcceptRequest extends React.Component {
    constructor(){
        super();
        this.makeClaim = this.makeClaim.bind(this);
    }

    makeClaim(accepted) {
      this.props.toggle()
      createMessageClaim.call({
        imageItemID: this.props.imageItemID,
        requestedBy: this.props.claim.username,
      })
      acceptFoodItemClaim.call({
        foodItemID: this.props.foodID,
        username: this.props.claim.username,
        accepted: accepted
      })
    }

    render() {
        console.log(this)
        const actions = [
          <ClaimControl
            portionsLeft={this.props.claim.requested}
            makeClaim={this.makeClaim}
          />,
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.props.toggle}
          />,
        ];
        return (
            <Dialog
              title="Accept"
              actions={actions}
              modal={true}
              contentStyle={{
                width: '100%',
                maxWidth: 'none',
              }}
              open={this.props.open}>
                How many portions do you wish to accept?
            </Dialog>
        )
    }
}

export default AcceptRequest;
