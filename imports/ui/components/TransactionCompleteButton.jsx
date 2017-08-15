import React, { PropTypes } from 'react';
import {CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {
  lightGreenA200
} from 'material-ui/styles/colors';

import {completeClaim} from '../../api/FoodItems/methods';

class TransactionCompleteButton extends React.Component {
  constructor() {
    super();
    this.completeTransaction = this.completeTransaction.bind(this);
  }

  completeTransaction = () => {
    this.props.completeUpdates.foodItemIDs.forEach((item)=>{
      completeClaim.call({
        foodItemID:item,
        username:this.props.completeUpdates .username
      })
    })
  }

  render(){
    return(
      <CardActions>
        <RaisedButton 
          backgroundColor={lightGreenA200}
          label="Food has been shared!"
          onTouchTap={this.completeTransaction}
        />
      </CardActions>
    );
  }
}

export default TransactionCompleteButton;