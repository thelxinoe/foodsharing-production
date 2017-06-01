import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { Messages } from './Messages';

export const insertMessage = new ValidatedMethod({
  name: 'messages.insert',
  validate: new SimpleSchema({
    messageID:{
      type:SimpleSchema.RegEx.Id,
    },
    comment: {
      type: String,
    },
  }).validator(),
  run({ messageID, comment }){
    const user = Meteor.user()
    if (!user) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    Messages.update(
      {_id:messageID},
      { $set: {seenBy: [user.username]},
      $push:{
        messages: {
          username: user.username,
          comment : comment,
          createdAt: new Date()
        }
      }
    }
  )
}
})

export const createMessageClaim = new ValidatedMethod({
  name: 'messages.claim.createAppend',
  validate: new SimpleSchema({
    imageItemID:{
      type:SimpleSchema.RegEx.Id,
    },
    requestedBy:{
      type:String,
    },
  }).validator(),
  run({imageItemID, requestedBy, item}) {
    const user = Meteor.user()
    if (!user) {
      throw new Meteor.Error(
        'api.FoodItem.makeFoodClaim.notLoggedIn',
        'Must be logged in.');
      }
      Messages.update(
        {
          imageItemID: imageItemID,
          requestedBy: requestedBy,
        },
        {
          $set:
          {
            imageItemID: imageItemID,
            sharedBy: user.username,
            requestedBy: requestedBy,
            seenBy: [user.username],
            createdAt: new Date(),
          }
        },
        {
          upsert: true,
        }
    );
    const messageID = Messages.find({
      imageItemID: imageItemID,
      requestedBy: requestedBy,
    }).fetch()[0]._id
    return messageID
  }
})
