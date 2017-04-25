import React from 'react';

import {
  TextField,
  IconButton,
  Paper,
} from 'material-ui';

import { Scrollbars } from 'react-custom-scrollbars';
import ContentSend from 'material-ui/svg-icons/content/send';

import {
  lightGreenA200,
} from 'material-ui/styles/colors';

import FoodItemList from './FoodItemList';
import Comments from './Comments';

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

const CommentSystem = React.createClass({

    getInitialState() {
      return {
        commentText: '',
      }
    },
    addComment(){
      this.props.addComment(this.state.commentText);
      this.setState({ commentText: '' });
    },
    handleComment(event){
      this.setState({
        commentText : event.target.value,
      });
    },

    render : function () {
      return (
        <div>
          <Scrollbars style={{ height: 215, position: 'relative' }}>
            <div>
              {this.props.comments !== undefined ?
              <Comments comments={this.props.comments} />
              :
              'There are no messages.'
              }
            </div>
          </Scrollbars>
          <Paper style={styles.paper} zDepth={0}>
            <div className="leftcolumn">
              <TextField
                style={{color: 'white'}}
                hintText="You can leave a comment here"
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
      );
    }
  }
);

export default CommentSystem;
