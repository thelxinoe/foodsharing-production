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
  message:{
    type:String
  },
  link:{
    type:String
  },
  notificationFor:{
    type:[String]
  },
  seenBy:{
    type:[String]
  },
  createdAt:{
    type: Date,
    defaultValue: new Date(),
  },
})

NotificationLink.attachSchema(NotificationLink.schema);

NotificationLink.publicFields = {
  itemName:1,
  link:1,
  notificationFor:1,
  seenBy:1,
}
