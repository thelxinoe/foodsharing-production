import React from 'react';
import {
  GridList,
  GridTile,
} from 'material-ui';
import TimeSince from './TimeSince';

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

const ImageItemGrid = React.createClass({

  calcTime: function (date) {
    return(
      <TimeSince time={date} />
    );
  },

  renderGridList : function(){
    imageItems = this.props.imageItemList.map((imageItem) => (
      <GridTile
        key={imageItem._id}
        onTouchTap={this.props.handleChange(imageItem._id)}
        title={imageItem.foodDescription}
        subtitle={this.calcTime(imageItem.createdAt)}
        >

        <img src={imageItem.imageURL} />

      </GridTile>
    ));

    return(
      <GridList
        cellHeight={200}
        style={styles.gridList}
        >
        {imageItems}
      </GridList>
    )
  },

  render() {
    return (
      <div style={styles.root}>
        {this.props.loading ? 'loading...' : this.renderGridList()}
      </div>
    );
  },

});

export default ImageItemGrid;
