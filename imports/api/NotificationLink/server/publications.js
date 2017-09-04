import { Meteor } from 'meteor/meteor';

import { NotificationLink } from '../NotificationLink.js';

Meteor.publish('notificationLink', function(username){

    return NotificationLink.find({
      notificationFor:{
        $elemMatch {
          username
        }
      },
      seenBy:{
        $nin {
          username
        }
      }
    });

});
