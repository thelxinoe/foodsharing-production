import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import FoodItemList from '../components/FoodItemList.jsx';

import {FoodItems} from '../../api/FoodItems/FoodItems.js';

const FoodItemListContainer = createContainer(({imageIDFilter}) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
        username: {
            $not: {
                $eq: user
            }
        }
    };
    const foodItems = Meteor.subscribe('foodItems');
    const foodItemList = FoodItems.find(query).fetch()
    const loading = !foodItems.ready();

    return {loading, foodItemList, imageIDFilter};

}, FoodItemList);

export default FoodItemListContainer
