import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import ActionList from 'material-ui/svg-icons/action/list';
import TimeSince from './TimeSince.jsx';

import {
  FlatButton,
  IconButton,
  Dialog,
  Snackbar,
  GridList,
  GridTile,
  Styles
} from 'material-ui';

import ActionSchedule from 'material-ui/svg-icons/action/schedule';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
  claim: {
    width: '100%',
    maxWidth: 'none',
  },

};

const GridImageView = React.createClass({

  calcTime: function(date){
    return(
      <TimeSince time={date} />
    );
  },

  renderGridList : function(){

    return(
      <GridList
        cellHeight={200}
        style={styles.gridList}
        >
        this.props.imageItemList.map((imageItem) => (
          <GridTile
            key={imageItem._id}
            onTouchTap={this.props.handleChange(imageItem.imageURL)}
            title={imageItem.foodDescription}
            subtitle={this.calcTime(imageItem.createdAt)}
            >

            <img src={imageItem.imageURL} />

          </GridTile>
        ));
      </GridList>
    )
  },

  render: function(){

    return(
      <div style={styles.root}>
        {this.props.loading ? 'loading...' : this.renderGridList()}
      </div>

    );
  }
});
export default GridImageView;
