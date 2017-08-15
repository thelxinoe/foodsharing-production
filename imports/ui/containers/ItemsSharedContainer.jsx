import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import ItemsShared from '../components/ItemsShared';

import { FoodItems } from '../../api/FoodItems/FoodItems.js';

const ItemsSharedContainer = createContainer((
  {
    requestedBy, sharedBy, imageItemID, user, url
  }) => {

  const foodItems = Meteor.subscribe('foodItems');
  const loading = !foodItems.ready();
  const sharedItems = [].concat.apply([], FoodItems.find({
      imageItemID: imageItemID,
      claims: {
          $elemMatch: {
              username: requestedBy,
              accepted: {
                  $gt: 0
              }
          }
      }
  }).fetch());

  let sharedItemList = '';
  let totalItems = '';
  if (sharedItems){
    sharedItemList = sharedItems.map((sharedItem) => {
      const portions = sharedItem.claims.find(
        (claim) => { return claim.username === requestedBy }
      ).accepted
      return `${portions} portions of ${sharedItem.foodName}`;
    }).join(', ')
    totalItems = sharedItems.reduce((sum, value)=>{
      const portions = value.claims.find(
        (claim) => { return claim.username === requestedBy }
      ).accepted
      return sum + portions
    }, 0)
  }
  const completeUpdates = {
    foodItemIDs: sharedItems.map((item)=>{return item._id}),
    username: requestedBy,
  }
  const otherUser = user==sharedBy ? sharedBy : requestedBy;
  const sharingRequesting = user === sharedBy ? ['sharing', 'with'] : ['requesting', 'from'];

  return { 
    loading, 
    otherUser, 
    sharedItemList, 
    sharingRequesting, 
    url, 
    totalItems,
    completeUpdates }
}, ItemsShared);

export default ItemsSharedContainer;
