import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Images } from '../Images/Images'

export const FoodItems = new Mongo.Collection('FoodItems');

FoodItems.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

FoodItems.schema = new SimpleSchema({
  imageItemID:{
    type:SimpleSchema.RegEx.Id,
  },
  imageID:{
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
  comments:{
    type:[Object],
    optional:true,
    blackbox:true,
  },
});

FoodItems.attachSchema(FoodItems.schema);

FoodItems.publicFields = {
  imageItemID:1,
  imageID:1,
  foodName:1,
  username:1,
  createdAt:1,
  portions:1,
  claims:1,
  comments:1,
};

FoodItems.helpers({
  image(){
    return Images.findOne(this.imageID);
  }
})
