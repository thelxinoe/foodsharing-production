import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

const GoogleMapAdd = React.createClass({
  // propTypes: {
  //   options: React.PropTypes.object.isRequired
  // },
  getOptions(){
    let additionalOptions = this.props.options || {}
    let options = Object.assign({},
      additionalOptions,
      {
        key:Meteor.settings.public.GoogleMaps.secret,
        libraries:'places'
      }
    )
    return options
  },
  componentDidMount() {
    GoogleMaps.load(this.getOptions());
    this.forceUpdate();
  },
  componentDidUpdate() {
    if(this.props.loaded){
      this.name = Random.id();
      GoogleMaps.create({
        name: this.name,
        element: this.container,
        options: this.props.mapOptions()
      });
      var listeners = this.props.listeners;
      GoogleMaps.ready(this.name, function(map) {
        if (listeners){
          listeners(map);
        }else{var dummyVar}
      });
    }
  },
  componentWillUnmount() {
    if (GoogleMaps.maps[this.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.name].instance);
      delete GoogleMaps.maps[this.name];
    }
  },
  render() {
    if (this.props.loaded){
      return (
        <div className="map-container" ref={c => (this.container = c)}/>
      );
    }else{
      return(
        <div>
          Loading map...
        </div>
      );
    }
  }
});
export default GoogleMapAdd;
