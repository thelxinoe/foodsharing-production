import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import GridImageView from '../components/GridImageView.jsx';

const GridImageViewContainer = createContainer(() => {

    const imageItems = Meteor.subscribe('ImageItems.GridImageView');
    const loading = !imageItems.ready();
    
    return {
        loading,
        imageItems.fetch(),
    };

}, GridImageView);



export default GridImageViewContainer

