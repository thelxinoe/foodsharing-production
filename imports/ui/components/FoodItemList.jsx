import React from 'react';
import { Link } from 'react-router';

import {
  Card,
  CardActions,
  CardHeader,
  CardText,
} from 'material-ui';

import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';

import ImagePopOver from './ImagePopOverButton';
import ClaimsButton from './ClaimsButton';
import TimeSince from './TimeSince';
import PortionImages from './PortionImages';
import Requests from './Requests';

class FoodItemList extends React.Component{

  constructor() {
    super();
    this.deleteFoodItem = this.deleteFoodItem.bind(this);
  }

  deleteFoodItem(){}

  renderItems(){
    var xCount = 1;

    return this.props.foodItemList.map((foodItem) => {
      xCount ++;
      return (
        <Card key={foodItem._id + xCount}>
          <CardHeader
            title={foodItem.foodName}
            subtitle={<PortionImages portions={foodItem.portions} portionsLeft={foodItem.portionsLeft} />}
            avatar={foodItem.imageURL}
            actAsExpander={true}
            showExpandableButton={true}
            />
          {this.props.renderClaims ?
            foodItem.claims ?
            <CardText>
              <Requests
                foodID={foodItem._id}
                claims={foodItem.claims}
              />
            </CardText>
          :
            <CardText>
              <p>No one has claimed this item yet</p>
            </CardText>
          :
          ''
          }
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
                <Link to={'/FoodComments/'+foodItem._id}>
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
