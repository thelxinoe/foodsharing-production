import { Meteor } from 'meteor/meteor';

import { NotificationLink } from '../NotificationLink.js';

Meteor.publish('notificationLink', function(username){
    const query = {
      notificationFor:{
        $in : [username]
      },
      seenBy:{
        $nin : [username]
      }
    }
    return NotificationLink.find(query);
});
