import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import { ImageItems } from './ImageItems';

export const insertImageItem = new ValidatedMethod({
  name: 'imageItem.insert',
  validate: ImageItems.schema.validator(),
  run( { imageID, location } ){
    if (!this.userId) {
      throw new Meteor.Error('api.lists.makePublic.notLoggedIn',
      'Must be logged in.');
    }
    ImageItems.insert({
      imageID: imageID,
      username: Meteor.user().username,
      location: location,
    });
  }

})
