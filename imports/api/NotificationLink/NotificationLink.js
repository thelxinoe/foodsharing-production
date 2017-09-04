import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const NotificationLink = new Mongo.Collection('NotificationLink');

NotificationLink.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

NotificationLink.schema = new SimpleSchema({
  link:{
    type:String
  },
  notificationFor:{
    type:[String]
  },
  seenBy:{
    type:[String]
  }
})

NotificationLink.attachSchema(NotificationLink.schema);

NotificationLink.publicFields = {
  link:1,
  notificationFor:1,
  seenBy:1,
}
