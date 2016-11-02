import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import MapView from '../components/MapView.jsx';

import {ImageItems} from '../../api/ImageItems/ImageItems.js';

const MapViewContainer = createContainer(() => {
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
    const loaded = (imageItems.ready() && GoogleMaps.loaded());

    return {loaded, imageItemList};

}, MapView);

export default MapViewContainer
