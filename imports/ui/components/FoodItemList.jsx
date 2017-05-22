import React from 'react';
import { Link } from 'react-router';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

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

const smallButton = {
  width: '25px',
  height: '25px',
  margin: '-175px',
  position: 'relative',
  top:' 50%',
  transform: 'translateY(-50%)',
};


class FoodItemList extends React.Component{

  constructor() {
    super();
    this.deleteFoodItem = this.deleteFoodItem.bind(this);
  }

  deleteFoodItem(item){
    //should probably do some code here
    this.deleteFoodItem(item);
  }

  genTit(tit){
    var len = 100;
    var titty;
    if (tit.lenth > len) {
     var titty =  tit.substring(0, len) + "...";
    }
    console.log(titty)
    return titty;
  }

  test(){
    console.log("oooweeee")
  }

  renderItems(){
    var xCount = 1;

    return this.props.foodItemList.map((foodItem) => {
      xCount ++;
      return (
        <Card key={foodItem._id + xCount}>
          <CardHeader
            title={this.genTit(foodItem.foodName)}
            subtitle={<PortionImages portions={foodItem.portions} portionsLeft={foodItem.portionsLeft} />}
            avatar={foodItem.imageURL}
            actAsExpander={false}
            showExpandableButton={false}
            onClick={this.test()}
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



          { this.props.comments == true ?
          ""
          :

          <CardActions expandable={false}>
            <div className="buttons-container">
              <div className="buttons-item">
                <ActionSchedule style={smallButton} />
                <TimeSince time={foodItem.createdAt}/>
              </div>
              {this.props.user == foodItem.username?
                <div className="buttons-item">
                  <ActionDelete onTouchTap={this.deleteFoodItem(foodItem)} />
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

        }
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
