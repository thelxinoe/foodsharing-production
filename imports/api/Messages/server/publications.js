import {Meteor} from 'meteor/meteor';

import {Messages} from '../Messages.js';

Meteor.publish('messages', function() {
  const query = {
    $or: [
      {
        sharedBy: this.userId
      }, {
        requestBy: this.userId
      }
    ]
  }
  return Messages.find();

});
