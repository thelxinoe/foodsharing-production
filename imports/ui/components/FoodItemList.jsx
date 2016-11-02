import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import FoodItem from './FoodItem.jsx'

import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


import {
  FlatButton,
  IconButton,
  Dialog,
  Snackbar,
  GridList,
  GridTile,
  Styles
} from 'material-ui';


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


var actions = [];

const FoodItemList = React.createClass({

  getInitialState() {
    return {
      openClaim: false,
      alreadyClaimed: false,
      claimPop: false,
    }
  },


  genClaimMess : function () {
    if (this.state.alreadyClaimed){
      return "You've already claimed that item!"
    }else{
      return "Item claimed! Please wait for a response."
    }
  },

  handleRequestClose : function () {
    this.setState({claimPop: false});
  },

  handleOpen : function (item) {
    this.genActions(item);
    this.setState({openClaim: true});
  },

  handleClose : function (alreadyClaimed) {
    this.setState({openClaim: false});
    this.setState({alreadyClaimed: alreadyClaimed});
    this.setState({claimPop: true});
  },

  genActions : function (item) {
    actions = [
      <ClaimControl

        id={item._id}
        claims={item.claims}
        portions={item.portionNo}
        username={Meteor.user().username}
        portionsLeft={item.portionNo - this.calculatePortionsLeft(item)}
        accept={false}
        finishIt={this.handleClose}
        />
      ,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleClose}
        />
    ];
  },

  calculatePortionsLeft: function (item) {
    var x = 0;
    var claims = item.claims;
    if (claims){
      for(claim in claims){
        if (claims[claim].accepted){
          x = x + claims[claim].request;
        }
      }

    } return x
  },

  renderItems(){
    if(this.props.imageIDFilter===''){
      var foodItemsFiltered=this.props.foodItemList;
    }else{
      filter = (function(x){return x.imageID==this.props.imageIDFilter}).bind(this);
      var foodItemsFiltered=this.props.foodItemList.filter(filter)
    }


    return foodItemsFiltered.map((foodItem) => {
      return (
        <FoodItem
          key = {foodItem._id}
          foodItem={foodItem}
          pathName={foodItem}
          calculatePortionsLeft={this.calculatePortionsLeft}
          handlePop={this.handleOpen}
          />
      );
    });

  },

  render(){
    return(
      <div>

        {this.renderItems()}

        <Snackbar
          open={this.state.claimPop}
          message={this.genClaimMess()}
          autoHideDuration={3600}
          action="Close"
          onTouchTap={this.handleRequestClose}
          onRequestClose={this.handleRequestClose}
          />

        <Dialog
          title="Claim!"
          actions={actions}
          modal={true}
          contentStyle={styles.claim}
          open={this.state.openClaim}
          >
          How many portions do you wish to claim?
        </Dialog>


      </div>
    )
  }

});
export default FoodItemList;
