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
            var xC = 1;
            return (
              claim.rejected ?
              ""
              :
              claim.accepted === 0 ?
                <RequestedItem
                  key={claim.username + xC}
                  foodID={this.props.foodID}
                  claim={claim}
                />
                :
                <AcceptedItem
                  key={claim.username}
                  foodID={this.props.foodID}
                  claim={claim}
                />
            );
            xC ++;
          })}
        </List>
      </div>
    );
  },

});

export default Requests;
