import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

//It's possible to implement custom collection commands if we need
export const ImageItems = new Monge.Collection('ImageItems');

// Deny all client-side updates since we will be using methods to manage this collection
ImageItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

ImageItems.schema = new SimpleSchema({
  imageURL:{
    type:String,
  },
  foodDescription:{},
  username:{},
  createdAt:{},
  location:{},
  totalItems:{},
});
