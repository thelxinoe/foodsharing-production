import { Meteor } from 'meteor/meteor';
import { ImageItems } from '../../api/ImageItems/ImageItems.js';
import { FoodItems } from '../../api/FoodItems/FoodItems.js';
import { Messages } from '../../api/Messages/Messages.js';
import { NotificationLink } from '../../api/NotificationLink/NotificationLink.js';
import faker from 'faker';

Meteor.users.remove({});

var numUsers = 3;
for (i = 0; i < numUsers; i++) {
  Accounts.createUser({
    username: 'tom' + i,
    email: 'tom' + i + '@mail.com',
    password: 'password',
    profile: {
        avatar: "ZyEA3oNuC3jXHMhPj",
    }
  });
};

ImageItems.remove({});
FoodItems.remove({});
Messages.remove({});
NotificationLink.remove({});

images = [
  "ZyEA3oNuC3jXHMhPj",
  "ZyEA3oNuC3jXHMhPj",
  "ZyEA3oNuC3jXHMhPj"
];
users = ['tom0','tom1','tom2']
var numPortions = 5;
var portionsLeft = 3;
var numFoodItems = 5;

for (let j = 0; j < images.length; j++) {
  ImageItems.insert({
    imageID: images[j],
    username: users[j],
    totalItems: numFoodItems,
    location: {
      lat: faker.address.latitude(),
      lng: faker.address.longitude()
    },
  }, function(err, id) {
    if (!err) {
      //Insert Comments
      var numComments = 35;
      for (i = 0; i < numComments; i++) {
        const userNum = Math.floor(Math.random() * numUsers);
        const users = Meteor.users.find().fetch();
        const currUser = users[userNum].username;
        const nextUser = users[(userNum+1)%numUsers].username;
        Messages.insert({
          imageItemID:id,
          sharedBy:currUser,
          requestedBy:nextUser,
          seenBy:[nextUser],
          messages: [{
            username: currUser,
            comment: faker.lorem.sentences(),
            createdAt: new Date()
          },
          {
            username: nextUser,
            comment: faker.lorem.sentences(),
            createdAt: new Date()
          },
          {
            username: currUser,
            comment: faker.lorem.sentences(),
            createdAt: new Date()
          },
          {
            username: nextUser,
            comment: faker.lorem.sentences(),
            createdAt: new Date()
          },],
        });
      }
      //Insert the food items and comments
      for (let k = 0; k < numFoodItems; k++) {
        FoodItems.insert({
          imageItemID: id,
          imageID: images[j],
          foodName: faker.lorem.sentence(),
          username: users[j],
          portions: numPortions,
          portionsLeft: portionsLeft,
          claims: [{
            username: Meteor.users.find().fetch()[Math.floor(Math.random() * numUsers)].username,
            requested: 1,
            accepted: 1,
            createdAt: new Date(),
            rejected: false,
          }, {
            username: Meteor.users.find().fetch()[Math.floor(Math.random() * numUsers)].username,
            requested: 5,
            accepted: 0,
            createdAt: new Date(),
            rejected: false,
          }, {
            username: Meteor.users.find().fetch()[Math.floor(Math.random() * numUsers)].username,
            requested: 3,
            accepted: 2,
            createdAt: new Date(),
            rejected: false,
          }, ],
        }, function(err,id){
          NotificationLink.insert({
            message:'get the actual name of the thing in here',
            link:'/FoodComments/'+id,
            notificationFor:['tom0','tom1','tom2'],
            seenBy:[]
          })
          var numComments = 35;
          for (i = 0; i < numComments; i++) {
            currUser = Meteor.users.find().fetch()[Math.floor(Math.random() * numUsers)];
            FoodItems.update({
              _id: id
            }, {
              $push: {
                comments: {
                  username: currUser.username,
                  comment: faker.lorem.sentences(),
                  createdAt: new Date()
                }
              }
            });
          }
        });
      }
    }
  });
}
