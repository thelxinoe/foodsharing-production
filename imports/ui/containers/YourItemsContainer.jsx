import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import YourItems from '../components/YourItems.jsx';

import {FoodItems} from '../../api/FoodItems/FoodItems.js';

const YourItemsContainer = createContainer(() => {
  const fakeData = [{
      imageID: 90,
      imageURL: "http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/istock_000050960496_medium.jpg",
      foodName: 'Load of old toss',
      username: 'tom0',
      portions: 5,
      claims: [{
          username: 'tom3',
          requested: 1,
          accepted: 1,
          createdAt: new Date(),
          parentId:7,
      }, {
          username: 'tom2',
          requested: 5,
          accepted: 0,
          createdAt: new Date(),
          parentId:7,

      }, {
          username: 'tom1',
          requested: 3,
          accepted: 2,
          createdAt: new Date(),
          parentId:7,

      }, ],
  }];
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
        username: user
    };
    const foodItems = Meteor.subscribe('foodItems');
    const foodItemList =fakeData//= FoodItems.find(query).fetch()
    const loading = !foodItems.ready();
    return {loading, foodItemList};

}, YourItems);

export default YourItemsContainer
