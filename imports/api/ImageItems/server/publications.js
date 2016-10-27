import { Meteor } from 'meteor/meteor';

import { ImageItems } from '../ImageItems.js';

Meteor.publish('imageItems', function(){

    //user = this.userId || '';
    //query = {username:{$not:{$eq:user}}};

    return ImageItems.find();

});
