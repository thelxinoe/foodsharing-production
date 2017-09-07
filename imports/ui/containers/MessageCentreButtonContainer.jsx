import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import MessageCentreButton from '../components/MessageCentreButton';
import { NotificationLink } from '../../api/NotificationLink/NotificationLink.js';

import {Messages} from '../../api/Messages/Messages.js';

const MessageCentreButtonContainer = createContainer(({ pathname, queryString }) => {

  const user = Meteor.user() ? Meteor.user().username : '';
  const query = {$and:[{$or:[{sharedBy:user},{requestBy:user}]},{seenBy:{$ne:user}}]}
  const notifications = Meteor.subscribe("notificationLink", user);
  const messages = Meteor.subscribe('messages');
  const unreadMessages = Messages.find(query).count() + NotificationLink.find().count();
  const loading = !(messages.ready() && notifications.ready());
  return { loading, unreadMessages, pathname, user, queryString };
}, MessageCentreButton);

export default MessageCentreButtonContainer;
