import React, {PropTypes} from 'react'

import {
  FlatButton,
  Dialog,
} from 'material-ui';

import ClaimControl from './ClaimControl';

class AcceptRequest extends React.Component {
    render() {

        const actions = [
          <ClaimControl
            portionsLeft={this.props.claim.requested}
          />,
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.props.toggle}
          />,
        ];
        return (
            <Dialog
              title="Accept"
              actions={actions}
              modal={true}
              contentStyle={{
                width: '100%',
                maxWidth: 'none',
              }}
              open={this.props.open}>
                How many portions do you wish to accept?
            </Dialog>
        )
    }
}

export default AcceptRequest;
