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
    type:String,
  },
  imageURL:{
    type:String,
  },
  foodName:{
    type:SimpleSchema.RegEx.Id,
  },
  username:{
      type:String,
  },
  createdAt:{
      type: Date,
      defaultValue: new Date(),
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
