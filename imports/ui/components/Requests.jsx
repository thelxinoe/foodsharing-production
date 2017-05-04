import React from 'react';

import {
  List,
  Divider,
} from 'material-ui';

import RequestedItem from './RequestedItem';
import AcceptedItem from './AcceptedItem';

const Requests = React.createClass({

  render() {
    return (
      <div>
        <List>
          <Divider />
          {this.props.claims.map((claim) => {

            return (
              claim.rejected ?
              ""
              :
              claim.accepted === 0 ?
                <RequestedItem
                  key={claim.username}
                  foodID={this.props.foodID}
                  claim={claim}
                  imageItemID={this.props.imageItemId}
                />
                :
                <AcceptedItem
                  key={claim.username}
                  foodID={this.props.foodID}
                  claim={claim}
                />
            );
          })}
        </List>
      </div>
    );
  },

});

export default Requests;
