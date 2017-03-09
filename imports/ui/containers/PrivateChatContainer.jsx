import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateChat from '../components/PrivateChat';

import { Messages } from '../../api/Messages/Messages.js';

const PrivateChatContainer = createContainer(({ messageID }) => {

  const user = Meteor.user() ? Meteor.user().username : '';

  const messages = Meteor.subscribe('messages');
  const loading = !messages.ready();

  const query = { _id :  messageID};
  const messageThread = Messages.findOne(query);
  const messageThreadExists = !loading && !!messageThread

  return { loading,
           messageThread : messageThreadExists ? messageThread.fetch() : [],
           user };
}, PrivateChat);

export default PrivateChatContainer;
