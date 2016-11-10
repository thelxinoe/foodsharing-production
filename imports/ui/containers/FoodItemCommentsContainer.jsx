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

    const foodItems = Meteor.subscribe('foodItems');
    const foodItem = FoodItems.findOne(query);
    const loading = !foodItems.ready();
    return { loading, foodItem, user };

}, FoodItemComments);

export default FoodItemCommentsContainer;
