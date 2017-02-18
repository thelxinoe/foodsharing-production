import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
  List,
  ListItem,
  Avatar,
  Drawer,
  IconButton,
  AppBar
} from 'material-ui';

import Colors from 'material-ui/styles';

import {
  green900
} from 'material-ui/styles/colors';

import SvgIcons from 'material-ui/svg-icons';

import PrivateChatDrawer from './PrivateChatDrawer';
import TimeSince from './TimeSince.jsx';


const MessageCentreMessages = React.createClass({

  getInitialState(){
    return{
      openNav: false,
      userCurr: '',
    }
  },

  componentWillReceiveProps(props){
    if(props.user != ''){
      this.setState({userCurr:props.user, openNav:true});
    }

  },

  getOtherUser(users, currentUser) {
    const otherUser = users.splice(users.indexOf(currentUser), 1);
    return otherUser;
  },

  renderMessagesList: function(){
    if(this.props.messageThreads){
      return this.props.messageThreads.map((thread) => {
        const otherUser = this.getOtherUser([thread.sharedBy, thread.requestedBy], this.props.user)
        const item =
        (<ListItem
          leftAvatar={
            <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
          }
          rightIconButton={
            !thread.seenBy.includes(this.props.user) ?
            <SvgIcons.CommunicationChatBubble 
              style={{
                top: '35%',
              }}
            />
            : ''
          }
          onTouchTap={
            this.openPrivateMessage(this.props.user, otherUser)
          }
          primaryText={otherUser}
          secondaryText={
            <div>
              <TimeSince time={thread.createdAt} />
              {thread.messages[thread.messages.length - 1].comment}
            </div>
          }
          secondaryTextLines={2}
        />
        )
        return(item)
      });
    }else{
      return(
        <div className="vertAlign">
          You currently have no messages. Go share some food!
        </div>
      );
    }
  },

  openPrivateMessage: function(currUser, otherUser) {
    handleIt = function() {
      console.log("Messages between: " + currUser + " & " + otherUser)
    }
    return handleIt
  },

  render : function(){
    return(
      this.props.loading ?
      <div>'loading...'</div>
      :
      <div>
        <List>
          {this.renderMessagesList()}
        </List>
        {/* <PrivateChatDrawer /> */}
      </div>
    );
  }
});
export default MessageCentreMessages;
