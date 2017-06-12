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

import { updateSeenBy } from '../../api/Messages/methods';

const MessageCentreMessages = React.createClass({

  contextTypes : {
    router: React.PropTypes.object,
    location: React.PropTypes.object,
  },

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
    console.log(this)
    if(this.props.messageThreads){
      return this.props.messageThreads.map((thread) => {
        const otherUser = this.getOtherUser([thread.sharedBy, thread.requestedBy], this.props.user)
        const item =
        (<ListItem
          leftAvatar={
            <Avatar src={thread.foodImage().url({store:'images'})} />
          }
          rightIconButton={
            !thread.seenBy.includes(this.props.user) ?
            <SvgIcons.CommunicationChatBubble />
            : ''
          }
          onTouchTap={
            this.openPrivateMessage(thread._id)
          }
          primaryText={thread.requestedBy}
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

  openPrivateMessage: function(messageID) {
    return function () {
      const queryString = Object.assign(
                            {},
                            this.context.location.query,
                            { openPrivateChat: true,
                              messageID : messageID,
                              openMessageCentre: true
                            }
                          );
      this.context.router.pushState(
                            this.context.location,
                            this.context.location.path,
                            queryString
                          )
      console.log(messageID)
      updateSeenBy.call({messageID})

    }.bind(this);
  },

  // compoentWillUpdate(){
  //   this.forceUpdate();
  // },

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
