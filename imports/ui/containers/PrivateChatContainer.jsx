import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateChat from '../components/PrivateChat';

import { Messages } from '../../api/Messages/Messages.js';
import '../../api/users/users.js';

const PrivateChatContainer = createContainer(({ messageID }) => {

  const user = Meteor.user() ? Meteor.user().username : '';

  const profile = Meteor.subscribe('profile');
  const messages = Meteor.subscribe('messages');
  const loading = !messages.ready() && !profile.ready();

  const query = { _id :  messageID};
  const messageThread = Messages.findOne(query);
  const messageThreadExists = !loading && !!messageThread;

  var avatar = {}

  if(messageThreadExists){
    avatar[messageThread.requestedBy] = Meteor.users.findOne({username:messageThread.requestedBy});
    avatar[messageThread.sharedBy] = Meteor.users.findOne({username:messageThread.sharedBy});
  }
  return {
           avatar,
           loading,
           messageThread : messageThreadExists ? messageThread : [],
           user,
         };
}, PrivateChat);

export default PrivateChatContainer;
