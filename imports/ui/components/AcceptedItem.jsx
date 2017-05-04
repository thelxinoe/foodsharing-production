import React, { PropTypes } from 'react'

import {
  ListItem,
  Divider,
  Avatar,
} from 'material-ui';

import CommunicationChat from 'material-ui/svg-icons/communication/chat';

class AcceptedItem extends React.Component {

  render() {
    return (<div>
      <ListItem
        primaryText={this.props.claim.username}
        secondaryText={"You have accepted " + this.props.claim.accepted + " out of " + this.props.claim.requested + " requested portions"}
        leftAvatar={
          <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
        }
        rightIcon={
          <CommunicationChat />
        }
        onTouchTap={this.openChat}
      />
      <Divider />
    </div>);
  }
}

export default AcceptedItem;
