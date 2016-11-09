import { Meteor } from 'meteor/meteor';

import { Messages } from '../Messages.js';

Meteor.publish('messages', function(){

    return Messages.find();

});
