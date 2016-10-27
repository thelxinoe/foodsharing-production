import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import GridImageView from '../components/GridImageView.jsx';

import {ImageItems} from '../../api/ImageItems/ImageItems.js';

const GridImageViewContainer = createContainer(({handleChange}) => {
    const imageItems = Meteor.subscribe('imageItems');
    const imageItemList = ImageItems.find().fetch()
    const loading = !imageItems.ready();
    console.log('loading ',loading);
    console.log('items ',imageItemList);

    return {
        loading,
        imageItemList,
        handleChange,
    };

}, GridImageView);



export default GridImageViewContainer
