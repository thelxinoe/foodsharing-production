import { Meteor } from 'meteor/meteor';

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
  update() {
    return true;
  },
});

//Check out the ddp rate limiting stuff when there is time
