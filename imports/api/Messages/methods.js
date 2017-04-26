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
