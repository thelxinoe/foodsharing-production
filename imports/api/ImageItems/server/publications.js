import { Meteor } from 'meteor/meteor';

import { ImageItems } from '../ImageItems.js';

Meteor.publish('ImageItems.GridImageView', function(){

    user = this.userId || '';
    query = {username:{$not:{$eq:user}}};
    
    return ImageItems.find(query);

});