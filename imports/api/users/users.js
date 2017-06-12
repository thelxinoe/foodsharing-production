import { Meteor } from 'meteor/meteor';
import { Images } from '../Images/Images';

Meteor.users.helpers({
    avatar(){
        return Images.findOne(this.profile.avatar)
    }
})