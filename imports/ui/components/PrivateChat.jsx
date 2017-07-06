import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
  TextField,
  RaisedButton,
  Styles,
  List,
  ListItem,
  Avatar,
  Divider,
  AppBar,
  Dialog,
  IconButton,
  Paper
} from 'material-ui';

import SvgIcons from 'material-ui/svg-icons';

import { Scrollbars } from 'react-custom-scrollbars';
import ContentSend from 'material-ui/svg-icons/content/send';

import TimeSince from './TimeSince';
import CommentSystem from './CommentSystem';
import { insertMessage } from '../../api/Messages/methods';

import {
  lightGreenA200,
  lightGreen600,
  green900,
  blueGrey300,
  blueGrey900,
  blueGrey600,
  grey50
} from 'material-ui/styles/colors';

const styles = {
  claim: {
    width: '100%',
    maxWidth: 'none',
  },
  smallIcon: {
    width: 25,
    height: 25,
  },
  small: {
    width: 50,
    height: 50,
    padding: 8,
  },
  paper:  {
    padding: '0px 0px 0px 10px',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%'
  }
};


const PrivateChat = React.createClass({

  addComment(comment){
    const messageID = this.props.messageID;
    insertMessage.call({messageID, comment})
  },

  componentWillUpdate: function() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  },

  componentDidUpdate: function() {
    var node = ReactDOM.findDOMNode(this);
    var container = document.getElementsByClassName('containerRoot')[0];
    if (node){
      container.scrollTop = node.scrollHeight;
    }
  },

  componentDidMount () {
    this.refs.scrollbars.scrollToBottom();
  },

  render() {
    var winHeight = window.innerHeight - 64;
    if (!this.props.loading){
    return (
      <div id='containerDiv'>
        <br/>
        <br/>
        <CommentSystem
          comments={this.props.messageThread.messages}
          addComment={this.addComment}
          {...this.props}
        />
      </div>

    );
  }else {
      return(<div/>)
  }
  }
});

export default PrivateChat;
