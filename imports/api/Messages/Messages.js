import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('Messages');

Messages.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Messages.schema = new SimpleSchema({
    imageItemID:{
      type:SimpleSchema.RegEx.Id,
    },
    sharedBy:{
      type:String,
    },
    requestedBy:{
      type:String,
    },
    createdAt:{
      type: Date,
      defaultValue: new Date(),
    },
    messages:{
      type:[Object],
      optional:true,
      blackbox:true,
    },
    seenBy:{
      type:[String]
    },
    lastComment:{
      type: Date,
      defaultValue: new Date(),
    },
});

Messages.attachSchema(Messages.schema);

Messages.publicFields = {
  imageItemID:1,
  sharedBy:1,
  requestedBy:1,
  createdAt:1,
  messages:1,
  seenBy:1,
}
