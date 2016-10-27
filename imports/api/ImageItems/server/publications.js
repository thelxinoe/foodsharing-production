import { Meteor } from 'meteor/meteor';

import { ImageItems } from '../ImageItems.js';

Meteor.publish('imageItems', function(){

    return ImageItems.find();

});
