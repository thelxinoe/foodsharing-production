import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import MessageCentreButton from '../components/MessageCentreButton';

import {Messages} from '../../api/Messages/Messages.js';

const MessageCentreButtonContainer = createContainer(({ pathname }) => {

  const user = Meteor.user() ? Meteor.user().username : '';
  const messages = Meteor.subscribe('messages');
  const unreadMessages = Messages.find().fetch()
  const loading = !messages.ready();
  return {loading, unreadMessages, pathname, user};

}, MessageCentreButton);

export default MessageCentreButtonContainer;
