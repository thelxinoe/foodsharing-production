import { Meteor } from 'meteor/meteor';

import { FoodItems } from '../FoodItems.js';

Meteor.publish('foodItems', function(){

    return FoodItems.find();

});
