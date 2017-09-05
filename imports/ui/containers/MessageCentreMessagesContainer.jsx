import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import MessageCentreMessages from '../components/MessageCentreMessages';

import { Messages } from '../../api/Messages/Messages.js';
import { NotificationLink } from '../../api/NotificationLink/NotificationLink.js';

const MessageCentreMessagesContainer = createContainer(() => {

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  const user = Meteor.user() ? Meteor.user().username : '';

  const images = Meteor.subscribe('images');
  const messages = Meteor.subscribe('messages');
  const notifications = Meteor.subscribe("notificationLink", 'tom0');
  const loading = !(messages.ready()&&images.ready()&&notifications.ready());

  const query = { $or: [{ sharedBy: user }, { requestedBy: user }] };
  var messageThreads = Messages.find(query).fetch();
  const notificationList = NotificationLink.find().fetch();
  const messageThreadExists = !loading && !!messageThreads && !!images.ready() && !!notificationList
  console.log(messageThreads.concat(notificationList))
  return { loading,
           messageThreads : messageThreadExists
            ? messageThreads
            :
            [],
           user };
}, MessageCentreMessages);

export default MessageCentreMessagesContainer;
