import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, browserHistory} from 'react-router';

import FoodItemList from './FoodItemList.jsx';
import ImageItemGridContainer from '../containers/ImageItemGridContainer.jsx';
import FoodItemListContainer from '../containers/FoodItemListContainer.jsx';
import Loading from './Tools/circleloading';
import ActionViewModule from 'material-ui/svg-icons/action/view-module.js';
import ActionList from 'material-ui/svg-icons/action/list.js';

import {Tab, Tabs, IconButton} from 'material-ui';

import {
  lightGreen300,
  lightGreen600,
  green900,
  brown300,
  brown600,
  brown900
} from 'material-ui/styles/colors';

const GridListTab = React.createClass({

  getInitialState() {
    return {value: 'grid', imageItemID: ''}
  },

  handleTileChange(value) {
    var val = value;
    return (function() {
      this.setState({imageItemID: val, value: 'list'});
    }).bind(this)
  },

  handleChange(value) {
    this.setState({value: value, imageItemID: ''});
  },

  render: function() {
    return (
      this.props.loading ? <Loading />:
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}>
        <Tab
          label={
            <ActionViewModule color='green900'/>
          }
          value="grid">
          <ImageItemGridContainer
            handleChange={this.handleTileChange}/>
        </Tab>

        <Tab
          label={
            < ActionList color = 'green900' />
        }
        value="list">
        <FoodItemListContainer
          imageItemIDFilter={this.state.imageItemID}/>
      </Tab>
    </Tabs>
  
  );
}
});
export default GridListTab;
