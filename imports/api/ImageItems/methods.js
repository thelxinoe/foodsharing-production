import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { ImageItems } from './ImageItems';

export const insertImageItem = new ValidatedMethod({
  name: 'imageItem.insert',
  validate: new SimpleSchema({
    imageID:{
      type:String,
    },
    location:{
        type:Object,
        blackbox:true,
    },
  }).validator(),
  run( { imageID, location } ){
    const user = Meteor.user()
    if (!user) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    return ImageItems.insert({
      imageID: imageID,
      username: user.username,
      location: location,
    });
  }

})
