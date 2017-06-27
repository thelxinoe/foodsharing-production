import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateChat from '../components/PrivateChat';

import { Messages } from '../../api/Messages/Messages.js';
import '../../api/users/users.js';

const PrivateChatContainer = createContainer(({ messageID }) => {

  const user = Meteor.user() ? Meteor.user().username : '';

  //const images = Meteor.subscribe('images');

  const messages = Meteor.subscribe('messages');
  const loading = !messages.ready(); //&& !images.ready();

  const query = { _id :  messageID};
  const messageThread = Messages.findOne(query);
  const messageThreadExists = !loading && !!messageThread;

  return {
           loading,
           messageThread : messageThreadExists ? messageThread : [],
           user,
         };
}, PrivateChat);

export default PrivateChatContainer;
