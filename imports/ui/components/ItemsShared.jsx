import React, { PropTypes } from 'react';
import {
  Card, 
  CardActions, 
  CardHeader, 
  CardMedia, 
  CardTitle, 
  CardText, 
  RaisedButton} from 'material-ui/Card';
import TransactionCompleteButton from './TransactionCompleteButton';
import Loading from './Tools/circleloading'

class ItemsShared extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.handleExpandChange = this.handleExpandChange.bind(this);
  }


  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  render(){
    console.log(this.props)
    return(
      this.props.loading ?
      <div><Loading /></div>
      :
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={
            `You are ${this.props.sharingRequesting[0]}
            ${this.props.totalItems} items
            ${this.props.sharingRequesting[1]}
            ${this.props.otherUser}`}
          subtitle="Please click to show full list."
          avatar={this.props.url}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <TransactionCompleteButton
          completeUpdates={this.props.completeUpdates}
          messageID={this.props.messageID}
        />
        <CardText expandable={true}>
          {this.props.sharedItemList}
        </CardText>
      </Card>

    );
  }
}

export default ItemsShared;
