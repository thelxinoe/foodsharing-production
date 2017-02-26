import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import MessageCentreMessages from '../components/MessageCentreMessages';

import { Messages } from '../../api/Messages/Messages.js';

const MessageCentreMessagesContainer = createContainer(() => {

  const user = Meteor.user() ? Meteor.user().username : '';

  const messages = Meteor.subscribe('messages');
  const loading = !messages.ready();

  const query = { $or: [{ sharedBy: user }, { requestedBy: user }] };
  const messageThreads = Messages.find(query);
  const messageThreadExists = !loading && !!messageThreads

  return { loading,
           messageThreads : messageThreadExists ? messageThreads.fetch() : [],
           user };
}, MessageCentreMessages);

export default MessageCentreMessagesContainer;
