import React, { PropTypes } from 'react'
import Loading from './Tools/circleloading';
import {
  FlatButton,
  Dialog,
} from 'material-ui';

import { rejectFoodItemClaim } from '../../api/FoodItems/methods';

class RejectRequest extends React.Component {

  constructor() {
    super();
    this.rejectClaim = this.rejectClaim.bind(this);
  }

  rejectClaim(){
    this.props.toggle()
    rejectFoodItemClaim.call({
      foodItemID: this.props.foodID,
      username: this.props.claim.username
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Reject Claim!"
        primary={true}
        onTouchTap={this.rejectClaim}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.toggle}
      />,
    ];
    return (
      this.props.loading ? <Loading />:
        <Dialog
          title="Reject"
          actions={actions}
          modal={true}
          contentStyle={{
            width: '100%',
            maxWidth: 'none',
          }}
          open={this.props.open}
        >
        Do you really want to reject this claim?
        </Dialog>
      
    );
  }
}

export default RejectRequest;
