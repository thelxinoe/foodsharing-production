import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { FoodItems } from './FoodItems';

export const insertFoodItems = new ValidatedMethod({
  name: 'foodItem.insert',
  validate: FoodItems.schema.validator(),
  run({ imageItemID, imageID, foodName, portions }){
    if (!this.userId) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    FoodItems.insert({
      imageItemID: imageItemID,
      imageID: imageID,
      foodName: foodName,
      portionsLeft : portions,
      portions: portions,
    })
  }

})
