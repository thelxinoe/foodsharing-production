import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import ImageItemGrid from '../components/ImageItemGrid.jsx';

import {ImageItems} from '../../api/ImageItems/ImageItems.js';

const ImageItemGridContainer = createContainer(({handleChange}) => {
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

}, ImageItemGrid);

export default ImageItemGridContainer
