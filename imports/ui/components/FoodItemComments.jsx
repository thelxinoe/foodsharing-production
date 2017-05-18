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

const FoodItemComments = React.createClass({

    getInitialState() {
      return {
        commentText: '',
      }
    },

    handleComment(event){
      this.setState({
        commentText : event.target.value,
      });
    },

    addComment(event) {
    },

    render : function () {
      return (
        this.props.loading ?
        <div>'loading...'</div>
        :
          <div>
            <FoodItemList
              foodItemList={[this.props.foodItem]}
              user={this.props.user}
              expandable={false}
            />
          <div>
            <Scrollbars style={{ height: 215, position: 'relative' }}>
              <div>
                <Comments comments={this.props.foodItem.comments} />
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
        </div>

      );
    }
  });

export default FoodItemComments;
