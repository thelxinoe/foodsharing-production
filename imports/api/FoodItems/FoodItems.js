import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const FoodItems = new Mongo.Collection('FoodItems');

FoodItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

FoodItems.schema = new SimpleSchema({
  imageURL:{
    type:String,
  },
  foodname:{
    type:string,
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
  claims:{
    type:[Object],
    opitonal:true,
  },
});

FoodItems.attachSchema(FoodItems.schema);

FoodItems.publicFields = {
    imageURL:1,
    foodName:1,
    username:1,
    createdAt:1,
    location:1,
    totalItems:1,
    messages:1,
};
