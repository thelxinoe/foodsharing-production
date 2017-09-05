import React, { PropTypes } from 'react'

import {
  ListItem,
  Divider,
  Avatar,
} from 'material-ui';

import CommunicationChat from 'material-ui/svg-icons/communication/chat';

class AcceptedItem extends React.Component {

  openPrivateMessage(messageID) {
    return function () {
      const queryString = Object.assign(
                            {},
                            this.context.location.query,
                            {
                              messageID : messageID,
                              openPrivateChat: true,
                            }
                          );
      this.context.router.pushState(
                            this.context.location,
                            this.context.location.pathname,
                            queryString
                          )
    }.bind(this);
  }

  render() {
    let avatar = undefined;
    try{
      avatar = <Avatar src={Meteor.users.findOne({username:this.props.claim.username}).avatar().url({store:'images'})} />
    }
    catch(e){
      avatar = <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
    }
    return (<div>
      <ListItem
        primaryText={this.props.claim.username}
        secondaryText={"You have accepted " + this.props.claim.accepted + " out of " + this.props.claim.requested + " requested portions"}
        leftAvatar={
          avatar
        }
        rightIcon={
          <CommunicationChat />
        }
        onTouchTap={this.openPrivateMessage(this.props.claim.messageID)}
      />
      <Divider />
    </div>);
  }
}

AcceptedItem.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

export default AcceptedItem;
