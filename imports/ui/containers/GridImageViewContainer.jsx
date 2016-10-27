import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import GridImageView from '../components/GridImageView.jsx';

import {ImageItems} from '../../api/ImageItems/ImageItems.js';

const GridImageViewContainer = createContainer(({handleChange}) => {
    const user = Meteor.user()
        ? Meteor.user().username
        : '';
    const query = {
        username: {
            $not: {
                $eq: user
            }
        }
    };
    const imageItems = Meteor.subscribe('imageItems');
    const imageItemList = ImageItems.find(query).fetch()
    const loading = !imageItems.ready();

    return {loading, imageItemList, handleChange};

}, GridImageView);

export default GridImageViewContainer
