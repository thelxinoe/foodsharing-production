import React, { PropTypes } from 'react';
import {Dialog} from 'material-ui';
import {CardActions} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {
  lightGreenA200
} from 'material-ui/styles/colors';
import {browserHistory} from 'react-router';

import {completeClaim} from '../../api/FoodItems/methods';
import {deleteMessage} from '../../api/Messages/methods';

class TransactionCompleteButton extends React.Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
    };
    this.completeTransaction = this.completeTransaction.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() { this.setState({ openDialog: true }); }
  closeDialog() { this.setState({ openDialog: false }); }

  completeTransaction = () => {
    this.closeDialog()
    this.props.completeUpdates.foodItemIDs.forEach((item)=>{
      completeClaim.call({
        foodItemID:item,
        username:this.props.completeUpdates.username
      })
    })
    deleteMessage.call({messageID:this.props.messageID})
    browserHistory.push((this.context.location.pathname+this.context.location.search).replace('openPrivateChat=true','openPrivateChat=false'))

  }

  render(){
    const dialogActions = [
      <FlatButton onTouchTap={this.closeDialog} label="CANCEL" />,
      <FlatButton onTouchTap={this.completeTransaction} label="CONTINUE" />
    ];

    return(
      <div>
      <CardActions>
        <RaisedButton
          backgroundColor={lightGreenA200}
          label="This food has been Shared!"
          onTouchTap={this.openDialog}
        />
      </CardActions>
      <Dialog
        title="Have you shared the food?"
        modal={false}
        actions={dialogActions}
        open={this.state.openDialog}
      >
        Pushing contiue will delete this message thread and the food items that have been shared.
        Do you want to continue?
      </Dialog>
      </div>
    );
  }
}
TransactionCompleteButton.contextTypes = {
    location: React.PropTypes.object
}

export default TransactionCompleteButton;
