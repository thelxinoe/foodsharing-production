import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { FoodItems } from './FoodItems';

export const insertFoodItems = new ValidatedMethod({
  name: 'foodItem.insert',
  validate: new SimpleSchema({
    imageItemID:{
      type:SimpleSchema.RegEx.Id,
    },
    imageID:{
      type:String,
    },
    foodName:{
      type:String,
    },
    portions:{
      type:Number,
    },
  }).validator(),
  run({ imageItemID, imageID, foodName, portions }){
    const user = Meteor.user()
    if (!user) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    FoodItems.insert({
      imageItemID: imageItemID,
      imageID: imageID,
      foodName: foodName,
      username: user.username,
      portionsLeft : portions,
      portions: portions,
    })
  }

})

export const insertFoodItemComment = new ValidatedMethod({
    name: 'foodItem.comment.insert',
    validate: new SimpleSchema({
      foodItemID:{
        type:SimpleSchema.RegEx.Id,
      },
      comment: {
        type: String,
      },
    }).validator(),
    run({ foodItemID, comment }){
      const user = Meteor.user()
      if (!user) {
        throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
        'Must be logged in.');
      }
      FoodItems.update(
        {_id:foodItemID},
        {$push:{
          comments: {
            username: user.username,
            comment : comment,
            createdAt: new Date()
          }
        }
      }
    )
  }
})
