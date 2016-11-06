import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FoodItems = new Mongo.Collection('FoodItems');

FoodItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

FoodItems.schema = new SimpleSchema({
  imageID:{
    type:SimpleSchema.RegEx.Id,
  },
  imageURL:{
    type:String,
  },
  foodName:{
    type:String,
  },
  username:{
    type:String,
  },
  createdAt:{
    type: Date,
    defaultValue: new Date(),
  },
  portionsLeft:{
    type:Number,
  },
  portions:{
    type:Number,
  },
  claims:{
    type:[Object],
    optional:true,
    blackbox:true,
  },
});

FoodItems.attachSchema(FoodItems.schema);

FoodItems.publicFields = {
  imageID:1,
  imageURL:1,
  foodName:1,
  username:1,
  createdAt:1,
  portions:1,
  claims:1,
};
