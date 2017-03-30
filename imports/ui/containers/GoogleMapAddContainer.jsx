import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import GoogleMapAdd from '../components/GoogleMapAdd';

const GoogleMapAddContainer = createContainer((props) => {
  const loaded = GoogleMaps.loaded()
  return { ...props, loaded };
}, GoogleMapAdd);

export default GoogleMapAddContainer;
