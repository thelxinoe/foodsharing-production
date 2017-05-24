import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';

import {FoodItems} from './FoodItems';

export const insertFoodItems = new ValidatedMethod({
    name: 'foodItem.insert',
    validate: new SimpleSchema({
        imageItemID: {
            type: SimpleSchema.RegEx.Id
        },
        imageID: {
            type: String
        },
        foodName: {
            type: String
        },
        portions: {
            type: Number
        }
    }).validator(),
    run({imageItemID, imageID, foodName, portions}) {
        const user = Meteor.user()
        if (!user) {
            throw new Meteor.Error('api.lists.makePublic.notLoggedIn', 'Must be logged in.');
        }
        FoodItems.insert({
            imageItemID: imageItemID,
            imageID: imageID,
            foodName: foodName,
            username: user.username,
            portionsLeft: portions,
            portions: portions
        })
    }

})

export const insertFoodItemComment = new ValidatedMethod({
    name: 'foodItem.comment.insert',
    validate: new SimpleSchema({
        foodItemID: {
            type: SimpleSchema.RegEx.Id
        },
        comment: {
            type: String
        }
    }).validator(),
    run({foodItemID, comment}) {
        const user = Meteor.user()
        if (!user) {
            throw new Meteor.Error('api.lists.makePublic.notLoggedIn', 'Must be logged in.');
        }
        FoodItems.update({
            _id: foodItemID
        }, {
            $push: {
                comments: {
                    username: user.username,
                    comment: comment,
                    createdAt: new Date()
                }
            }
        })
    }
})

export const makeFoodItemClaim = new ValidatedMethod({
    name: 'foodItem.claim',
    validate: new SimpleSchema({
        foodItemID: {
            type: SimpleSchema.RegEx.Id
        },
        requested: {
            type: Number
        }
    }).validator(),
    run({foodItemID, requested}) {
        const user = Meteor.user()
        if (!user) {
            throw new Meteor.Error(
              'api.FoodItem.makeFoodClaim.notLoggedIn',
              'Must be logged in.');
        }
        const exists = FoodItems.find({
            _id: foodItemID,
            claims: {
                $elemMatch: {
                    username: user.username
                }
            }
        }).count()
        if (!!exists){
          throw new Meteor.Error(
            'api.foodItem.makeFoodClaim.foodItem.claim.alreadyExists',
            'Must be only one claim ');
        } else {
        FoodItems.update({
            _id: foodItemID
        }, {
            $push: {
                claims: {
                    username: user.username,
                    requested: requested,
                    accepted: 0,
                    createdAt: new Date(),
                    rejected: false
                }
            }
        })
      }
    }
})

export const acceptFoodItemClaim = new ValidatedMethod({
    name: 'foodItem.accept',
    validate: new SimpleSchema({
        foodItemID: {
            type: SimpleSchema.RegEx.Id
        },
        accepted: {
            type: Number
        },
        username: {
          type: String
        }
    }).validator(),
    run({foodItemID, accepted, username}) {
        const user = Meteor.user()
        if (!user) {
            throw new Meteor.Error(
              'api.FoodItem.acceptFoodClaim.notLoggedIn',
              'Must be logged in.');
        }
        FoodItems.update({
          _id: foodItemID,
          "claims.username": username
        },
        { $set:
          {"claims.$.accepted":accepted}
        })
    }
})

export const rejectFoodItemClaim = new ValidatedMethod({
    name: 'foodItem.reject',
    validate: new SimpleSchema({
        foodItemID: {
            type: SimpleSchema.RegEx.Id
        },
        username: {
          type: String
        }
    }).validator(),
    run({foodItemID, username}) {
        const user = Meteor.user()
        if (!user) {
            throw new Meteor.Error(
              'api.FoodItem.acceptFoodClaim.notLoggedIn',
              'Must be logged in.');
        }
        FoodItems.update({
          _id: foodItemID,
          "claims.username": username
        },
        { $set:
          {"claims.$.rejected":true}
        })
    }
})
