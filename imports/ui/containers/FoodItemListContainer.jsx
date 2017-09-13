import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import FoodItemList from '../components/FoodItemList.jsx';

import {FoodItems} from '../../api/FoodItems/FoodItems.js';

const FoodItemListContainer = createContainer(({ imageItemIDFilter, params }) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const imageID = imageItemIDFilter || (params ? params.imageID : 0)
    const query = imageID ? {
        username: {
            $not: {
                $eq: user
            }
        },
        imageItemID: imageID,
    } :
    {
        username: {
            $not: {
                $eq: user
            }
        },
    }

    const images = Meteor.subscribe('images');
    const foodItems = Meteor.subscribe('foodItems');
    const foodItemList = FoodItems.find(query).fetch();
    const loading = !foodItems.ready() && !images.ready();

    return { loading, foodItemList, user };

}, FoodItemList);

export default FoodItemListContainer
