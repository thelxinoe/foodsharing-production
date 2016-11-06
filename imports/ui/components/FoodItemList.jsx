import React from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardActions,
  CardHeader,
} from 'material-ui';

import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

import ImagePopOver from './ImagePopOverButton';
import ClaimsButton from './ClaimsButton';
import TimeSince from './TimeSince';
import PortionImages from './PortionImages';

class FoodItemList extends React.Component{

  constructor() {
    super();
    this.deleteFoodItem = this.deleteFoodItem.bind(this);
  }

  deleteFoodItem(){}

  renderItems(){
    if(this.props.imageIDFilter===''){
      var foodItemsFiltered=this.props.foodItemList;
    }else{
      filter = (function(x){return x.imageID==this.props.imageIDFilter}).bind(this);
      var foodItemsFiltered=this.props.foodItemList.filter(filter);
    }

    return foodItemsFiltered.map((foodItem) => {
      return (
        <Card key={foodItem._id}>
          <CardHeader
            title={foodItem.foodName}
            subtitle={<PortionImages portions={foodItem.portions} portionsLeft={foodItem.portionsLeft} />}
            avatar={foodItem.imageURL}
            actAsExpander={true}
            showExpandableButton={true}
            />
          <CardActions expandable={true}>
            <div className="buttons-container">
              <div className="buttons-item">
                <ActionSchedule style="smallButton" />
                <TimeSince time={foodItem.createdAt}/>
              </div>
              {this.props.user == foodItem.username?
                <div className="buttons-item">
                  <ActionDelete onTouchTap={this.deleteFoodItem} />
                </div>
                :
                <div className="buttons-item">
                  <ClaimsButton
                    foodID={foodItem._id}
                    portionsLeft={foodItem.portionsLeft}
                    />
                </div>
              }
              <div className="buttons-item">
                <ImagePopOver
                  image={foodItem.imageURL}
                  title={foodItem.foodName}
                  />
              </div>
              <div className="buttons-item">
                <Link to={'/ItemView/'+foodItem.imageID}>
                  <CommunicationChat />
                </Link>
              </div>
            </div>
          </CardActions>
        </Card>
      );
    });
  }
  render(){
    return(
      <div>
        {this.renderItems()}
      </div>
    );
  }

};
export default FoodItemList;
