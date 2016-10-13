import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// class ImageItemsCollection extends Mongo.Collection {
//     insert(doc, callback){
//         const ourDoc = doc;
//         ourDoc.createdAt = ourDoc.createdAt || new Date();
//         const result = super.insert(ourDoc,callback);
//         return result
//     }

// };

//It's possible to implement custom collection commands if we need
export const ImageItems = new Mongo.Collection('ImageItems');

// Deny all client-side updates since we will be using methods to manage this collection
ImageItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

//Schema can be extended to validate data
ImageItems.schema = new SimpleSchema({
  imageURL:{
    type:String,
  },
  foodDescription:{
      type:String,
  },
  username:{
      type:String,
  },
  createdAt:{
      type: Date,
      defaultValue: new Date(),
  },
  location:{
      type:Object,
      blackbox:true,
  },
  totalItems:{
      type:Number,
  },
});

ImageItems.attachSchema(ImageItems.schema);

ImageItems.publicFields = {
    imageURL:1,
    foodDescription:1,
    username:1,
    createdAt:1,
    location:1,
    totalItems:1,
};