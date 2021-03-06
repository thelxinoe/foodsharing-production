import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import FoodItemComments from '../components/FoodItemComments';

import { FoodItems } from '../../api/FoodItems/FoodItems.js';

const FoodItemCommentsContainer = createContainer((props) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
          _id: props.params.foodID
        }
    const profile = Meteor.subscribe('profile');
    const foodItems = Meteor.subscribe('foodItems');
    const images = Meteor.subscribe('images');
    const foodItem = FoodItems.findOne(query);
    const loading = !(foodItems.ready() && profile.ready() && images.ready());
    var avatar = {}
    if (!loading && !!foodItem){
      var uniqueUsers = [...new Set(foodItem.comments.map(item => item.username))];
      for (var i = 0, len = uniqueUsers.length; i < len; i++) {
        var avatarUser = uniqueUsers[i];
        avatar[avatarUser] = Meteor.users.findOne({username:avatarUser});
      }

    }
    return {avatar, loading, foodItem, user, uniqueUsers };

}, FoodItemComments);

export default FoodItemCommentsContainer;
