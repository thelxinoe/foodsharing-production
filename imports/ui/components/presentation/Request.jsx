import React, { PropTypes } from 'react';

import ClaimControl from '../ClaimControl.jsx';

export default class Request extends React.Component{


  render(){

    return(


              <div>

                <ListItem
                  primaryText={claim.username}
                  secondaryText={"Has requested " + claim.requested + " portions"}
                  leftAvatar={
                    <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
                  }
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem
                      key={1}
                      primaryText="Accept"
                      leftIcon={
                        <ActionCheckCircle color='Green'/>
                      }
                      onTouchTap={this.getAcceptHandler(claim)}
                      />
                    ,
                    <ListItem
                      key={2}
                      primaryText="Reject"
                      leftIcon={
                        <ContentBlock color='Red'/>
                      }
                      onTouchTap={this.getRejectHandler(claim)}
                      />
                    ,
                  ]}
                  />

                <Divider />

              </div>
              :
              <div>

                <ListItem
                  primaryText={claim.username}
                  secondaryText={"You have accepted " + claim.accepted + " out of " + claim.requested + " requested portions"}
                  leftAvatar={
                    <Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
                  }
                  rightIcon={
                    <CommunicationChat />
                  }
                  onTouchTap={this.getChatHandler(claim)}
                  />

                <Divider />

              </div>


    )

  }
}
