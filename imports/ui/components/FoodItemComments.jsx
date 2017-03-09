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

    addComment(event) {
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
        {console.log('food items')}
        <CommentSystem
          comments={this.props.foodItem.comment}
          addComment={this.addComment}
        />

        </div>
      );
    }
  });

export default FoodItemComments;
