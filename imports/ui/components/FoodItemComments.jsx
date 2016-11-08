import React from 'react';

import {
  TextField,
  IconButton,
  Paper,
} from 'material-ui';

import TimeSince from './TimeSince.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import ContentSend from 'material-ui/svg-icons/content/send';

import {
  lightGreenA200,
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
  paper: {
    padding: '0px 0px 0px 10px',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%',
  }
};

const FoodItemComments = React.createClass({

    getInitialState() {
      return {
        openClaim: false,
        alreadyClaimed: false,
        claimPop: false,
        actions: [],
        commentText:"",
      }
    },

    renderComments(){

        return this.props.imageItem.comments.map((message) => {
          var currUsr = message.username;
          var same = false;
          if(currUsr == prvUsr){
            same = true;
          }else{prvUsr = currUsr;}
          prvUsr = currUsr;
          return(
            <Comment
              comment={message.comment}
              date={<TimeSince time={message.createdAt} />}
              username={currUsr}
              same={same}
            />
          )
        });
    },

    handleComment(event){
      this.setState({
        commentText : event.target.value,
      });
    },

    addComment(event) {
    },

    keyDown (value) {
      if (value.keyCode == 13){
        this.addComment()
      }
    },
    render : function () {
      return (
        <div className="fillDiv">
          <div>
            <div comment="put the thing that tells you what you are commenting on"/>
          </div>
          <div>
            <Paper style={styles.paper} zDepth={5}>
              <div className="leftcolumn">
                <TextField
                  style={{color: 'white'}}
                  hintText="You can leave a comment here"
                  onKeyDown={this.keyDown}
                  onChange={this.handleComment}
                  value={this.state.commentText}/>
              </div>
              <div className="rightcolumn">
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.addComment}
                  >
                  <ContentSend color={lightGreenA200} />
                </IconButton>
              </div>
            </Paper>
          </div>
          <Scrollbars style={{ height: 285, position: 'relative' }}>
            <div>
              {this.renderComments()}
            </div>
          </Scrollbars>
        </div>
      );
    }
  });

export default FoodItemComments;
