import { Meteor } from 'meteor/meteor';

import { FoodItems } from '../FoodItems.js';

Meteor.publish('FoodItems', function(){

    return FoodItems.find();

});
