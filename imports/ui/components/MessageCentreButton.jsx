import {Meteor} from 'meteor/meteor';

import React, { PropTypes } from 'react';

import {
  Link,
} from 'react-router';

import {
  IconButton,
  Badge,
} from 'material-ui';

import SvgIcons from 'material-ui/svg-icons';

class MessageCentreButton extends React.Component {
  render(){
    return (
      this.props.user ?
      <Badge
        badgeContent={this.props.unreadMessages}
        primary={true}
        badgeStyle={{top: '10%'}}
        >
        <IconButton
          className='messagething'
          linkButton={true}
          containerElement={
            <Link to={{ pathname: this.props.pathname, query: { openMessageCentre: true }}}/>
          }
          tooltip="Messages"
          tooltipPosition="top-right"
          style={{top:'-24px', right:'-24px'}}
          disabled={false}>
          <SvgIcons.CommunicationForum color='White'/>
        </IconButton>
      </Badge>
      :
      <IconButton
        linkButton={true}
        containerElement={
          <Link to={{ pathname: this.props.pathname, query: { openMessageCentre: true }}}/>
        }
        tooltip="Messages"
        tooltipPosition="top-right"
        disabled={false}>
        <SvgIcons.CommunicationForum color='White'/>
      </IconButton>

    )
  }
}

export default MessageCentreButton;
