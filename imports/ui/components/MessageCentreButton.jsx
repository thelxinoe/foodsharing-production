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
    const queryString = Object.assign({},this.props.query,{ openMessageCentre: true });
    const { pathname, unreadMessages, user } = this.props
    return (
      user ?
        <Badge
          badgeContent={unreadMessages}
          primary={true}
          badgeStyle={{top: '10%'}}
          containerElement={
            <Link to={{
                pathname: pathname,
                query: queryString
              }}/>
          }
          >
          <IconButton
            containerElement={
              <Link to={{
                  pathname: pathname,
                  query: queryString
                }}/>
            }
            tooltip="Messages"
            style={{ top: '-24px', right: '-24px' }}
            disabled={false}>
            <SvgIcons.CommunicationForum color='White'/>
          </IconButton>
        </Badge>
      :
        <IconButton
          containerElement={
            <Link to={{ pathname: pathname, query: queryString }}/>
          }
          tooltip="Messages"
          disabled={false}>
          <SvgIcons.CommunicationForum color='White'/>
        </IconButton>
    )
  }
}

export default MessageCentreButton;
