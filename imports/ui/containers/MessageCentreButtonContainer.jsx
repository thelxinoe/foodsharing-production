import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import MessageCentreButton from '../components/MessageCentreButton';

import {Messages} from '../../api/Messages/Messages.js';

const MessageCentreButtonContainer = createContainer(({ pathname }) => {

  Messages.find({$and:[{$or:[{sharedBy:'tom0'},{requestBy:'tom0'}]},{'seenBy':{$ne:'tom0'}}]}).count()

  const user = Meteor.user() ? Meteor.user().username : '';
  const query = {$and:[{$or:[{sharedBy:user},{requestBy:user}]},{seenBy:{$ne:user}}]}
  const messages = Meteor.subscribe('messages');
  const unreadMessages = Messages.find(query).count();
  const loading = !messages.ready();
  return {loading, unreadMessages, pathname, user};

}, MessageCentreButton);

export default MessageCentreButtonContainer;
