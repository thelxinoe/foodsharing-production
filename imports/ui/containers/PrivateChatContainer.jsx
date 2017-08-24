import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import PrivateChat from '../components/PrivateChat';

import { Messages } from '../../api/Messages/Messages.js';
import '../../api/users/users.js';

const PrivateChatContainer = createContainer(({ messageID }) => {

  const user = Meteor.user() ? Meteor.user().username : '';

  const profile = Meteor.subscribe('profile');
  const messages = Meteor.subscribe('messages');
  const images = Meteor.subscribe('images');

  const query = { _id :  messageID};
  const messageThread = Messages.findOne(query);
  console.log(messageThread)
  let messageThreadExists = !!messageThread;
  let loading = !(messages.ready() && profile.ready() && images.ready() && messageThreadExists);

  try{
    console.log(messageThread.foodImage())
    Meteor.users.findOne({username:messageThread.requestedBy}).avatar();
    Meteor.users.findOne({username:messageThread.sharedBy}).avatar();

  }
  catch(e){
    loading = true;
  }


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
