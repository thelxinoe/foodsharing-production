import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import FoodItemList from '../components/FoodItemList.jsx';

import {FoodItems} from '../../api/FoodItems/FoodItems.js';

const FoodItemListAddContainer = createContainer(({ imageItemIDFilter }) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
      username: user,
      imageItemID: imageItemIDFilter,
    };

    const images = Meteor.subscribe('images');
    const foodItems = Meteor.subscribe('foodItems');
    const foodItemList = FoodItems.find(query).fetch();
    const loading = !foodItems.ready() && !images.ready();

    return {loading, foodItemList, user};

}, FoodItemList);

export default FoodItemListAddContainer
