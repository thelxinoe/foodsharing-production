import React, { PropTypes } from 'react';

import {
  ListItem,
  Divider,
  Avatar,
} from 'material-ui';

import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ContentBlock from 'material-ui/svg-icons/content/block';

import AcceptRequest from './AcceptRequest';
import RejectRequest from './RejectRequest';

class RequestedItem extends React.Component {
  constructor() {
    super();
    this.state = {
      acceptRequestOpen: false,
      rejectRequestOpen: false,
    };
    this.rejectRequestToggle = this.rejectRequestToggle.bind(this);
    this.acceptRequestToggle = this.acceptRequestToggle.bind(this);
  }

  rejectRequestToggle() {
    this.setState({ rejectRequestOpen: !this.state.rejectRequestOpen });
  }

  acceptRequestToggle() {
    this.setState({ acceptRequestOpen: !this.state.acceptRequestOpen });
  }

  render() {
    const acceptReject = [
      <ListItem
        key={0}
        primaryText="Accept"
        leftIcon={
          <ActionCheckCircle color='Green'/>
        }
        onTouchTap={this.acceptRequestToggle}
      />,
      <ListItem
        key={1}
        primaryText="Reject"
        leftIcon={
          <ContentBlock color='Red'/>
        }
        onTouchTap={this.rejectRequestToggle}
      />,
    ];
    let avatar = undefined;
    try{
      avatar = <Avatar src={Meteor.users.findOne({username:this.props.claim.username}).avatar().url({store:'images'})} />
    }
    catch(e){
      avatar = <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
    }
    return(
      <div>
        <ListItem
        primaryText={this.props.claim.username}
        secondaryText={"Has requested " + this.props.claim.requested + " portions"}
        leftAvatar={
          avatar
        }
        primaryTogglesNestedList={true}
        nestedItems={acceptReject}
        />
        <Divider />
        <AcceptRequest
          toggle={this.acceptRequestToggle}
          open={this.state.acceptRequestOpen}
          {...this.props}
        />
        <RejectRequest
          toggle={this.rejectRequestToggle}
          open={this.state.rejectRequestOpen}
          {...this.props}
        />
      </div>
  )}
}

export default RequestedItem;
