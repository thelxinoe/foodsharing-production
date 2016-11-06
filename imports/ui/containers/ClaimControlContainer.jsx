import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ClaimControl from '../components/ClaimControl';

import { FoodItems } from '../../api/FoodItems/FoodItems';

const ClaimControlContainer = createContainer(({ foodID }) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
        _id: foodID,
    };
    const foodItems = Meteor.subscribe('foodItems');
    const foodItem = FoodItems.findOne(query).fetch()
    const loading = !foodItems.ready();

    return { loading, foodItem, user };

}, ClaimControl);

export default ClaimControlContainer;
