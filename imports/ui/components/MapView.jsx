import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import GoogleMap from './GoogleMap.jsx'

const MapView = React.createClass({

  listeners() {
    return [{l:'click', f: function(e){console.log(e.latLng.lat(),e.latLng.lng())},}]
  },

  componentDidMount() {
    GoogleMaps.load({key:'AIzaSyC_muGOORl5WqYTyBMJtEw05AESKYBm3nY',libraries:'places'});
  },

  getInitialState(){
    return{

    }
  },

  _mapOptions() {
    return {
      center: new google.maps.LatLng(55.9532, -3.1882),
      zoom: 8
    };
  },

  render() {

    if (this.props.loaded){
      return <GoogleMap
        name="mymap"
        options={this._mapOptions()}
        markers={this.props.imageItemList}
        listeners={this.listeners()} />;
    }
    return <div>
      Loading map...
    </div>;
  }
});

export default MapView;
