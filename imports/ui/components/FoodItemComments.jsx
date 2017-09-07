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
import { newNotification } from '../../api/NotificationLink/methods';

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
      newNotification.call({
          message: 'There\'s a new message for you about '+this.props.foodItem.foodName,
          link: '/FoodComments/'+this.props.foodItem._id,
          notificationFor: this.props.uniqueUsers,
      })
    },

    render : function () {
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
          avatar={this.props.avatar}
        />

        </div>
      );
    }
  });

export default FoodItemComments;
