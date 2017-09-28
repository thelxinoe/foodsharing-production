import React from 'react';
import {
  GridList,
  GridTile,
} from 'material-ui';
import TimeSince from './TimeSince';
import Loading from './Tools/circleloading'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
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
        title={imageItem.totalItems + " items to share"}
        subtitle={this.calcTime(imageItem.createdAt)}
        >
        console.log(image())
        <img
          src={this.props.loading ? <Loading />: imageItem.image().url({store: 'images'})}
        />
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
        {this.props.loading ? <Loading />: this.renderGridList()}
      </div>
    );
  },

});

export default ImageItemGrid;
