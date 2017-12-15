import { Meteor } from 'meteor/meteor';
import { ImageItems } from '../../api/ImageItems/ImageItems.js';
import { FoodItems } from '../../api/FoodItems/FoodItems.js';
import { Messages } from '../../api/Messages/Messages.js';
import { NotificationLink } from '../../api/NotificationLink/NotificationLink.js';
import faker from 'faker';

Meteor.users.remove({});
ImageItems.remove({});
FoodItems.remove({});
Messages.remove({});
NotificationLink.remove({});