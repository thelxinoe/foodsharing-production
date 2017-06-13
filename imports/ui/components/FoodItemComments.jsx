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
import CommentSystem from './CommentSystem';
import { insertFoodItemComment } from '../../api/FoodItems/methods';

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
    addComment(comment) {
      insertFoodItemComment.call({
        foodItemID: this.props.params.foodID,
        comment: comment,
      });
    },


    addComment(event) {
    },

    calcScreenH(){
      var height = window.innerHeight - 446;
      return height;
    },


    render : function () {
      console.log(this.props)
      return (

        this.props.loading ?
        <div>'loading...'</div>
        :

        <div className="fillDiv">
          <FoodItemList
              foodItemList={[this.props.foodItem]}
              user={this.props.user}
          />
        <CommentSystem
          comments={this.props.foodItem.comments}
          addComment={this.addComment}
        />


          <div>
            <FoodItemList
              foodItemList={[this.props.foodItem]}
              user={this.props.user}
              expandable={false}
              comments={true}
            />
          <div>
            <Scrollbars style={{ height: this.calcScreenH(), position: 'relative' }}>
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
