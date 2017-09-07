import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { NotificationLink } from './NotificationLink';

export const newNotification = new ValidatedMethod({
  name: 'new.Notification',
  validate: new SimpleSchema({
    message:{
      type:String
    },
    link:{
      type:String
    },
    notificationFor:{
      type:[String]
    },
  }).validator(),
  run({message,link,notificationFor}){
    const user = Meteor.user()
    if (!user) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    NotificationLink.update(
      {link:link},
      {$set:
        {
          message:message,
          link:link,
          notificationFor:notificationFor,
          seenBy:[user.username],
          createdAt:Date()
        }
      }
    )
  }
});

export const seenNotification = new ValidatedMethod({
  name: 'seen.notification',
  validate: new SimpleSchema({
    notificationID : {
      type: SimpleSchema.RegEx.Id,
    },
  }).validator(),
  run({notificationID}){
    const user = Meteor.user();
    if (!user) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    NotificationLink.update(
      {_id: notificationID },
      {
        $push: {
          seenBy : user.username
        }
      }
    )
  }
})
