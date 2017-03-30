import {Meteor} from 'meteor/meteor';

import {Images} from '../Images';

Meteor.publish('images', function() {

  return Images.find();

});
