import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import FoodItemList from '../components/FoodItemList.jsx';

import {FoodItems} from '../../api/FoodItems/FoodItems.js';

const YourItemsContainer = createContainer(({ imageItemIDFilter }) => {

    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = imageItemIDFilter ? {
        username: user,
        imageItemID: imageItemIDFilter,
    } :
    {
        username: user
    };
    const renderClaims = true;
    const foodItems = Meteor.subscribe('foodItems');
    const foodItemList = FoodItems.find(query).fetch()
    const loading = !foodItems.ready();
    return { loading, foodItemList, user, renderClaims };

}, FoodItemList);

export default YourItemsContainer
