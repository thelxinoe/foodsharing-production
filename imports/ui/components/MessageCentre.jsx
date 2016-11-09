import React, {PropTypes} from 'react';

import { IconButton, Drawer, AppBar } from 'material-ui';
import SvgIcons from 'material-ui/svg-icons';

const MessageCentre = (props) => {
    return (
      <Drawer
        width={winWidth}
        openSecondary={true}
        open={this.state.openNav}
        docked={false}
        onRequestChange={this.handleCloseNav}>
        <div className="headContain">
          <AppBar
            title="Messages"
            iconElementLeft={
              < IconButton onTouchTap = {
                  this.handleCloseNav
                }>
                <SvgIcons.ContentBackspace
                  color={green900}/>
                < /IconButton>
              }
              iconElementRight={
                <IconButton
                  onTouchTap = {
                    this.handleOpen
                  }
                  >
                  <SvgIcons.ActionSettings
                    color={green900}
                    />

                  < /IconButton>
                }
                targetOrigin={{
                  horizontal: 'right',
                  vertical: 'top'
                }}/>
              </div>
              {this.data.currentUser == ''
                ?
                <div className="vertAlign">
                  <br/>
                  You have no messages, go share some food! :)
                </div>
                :
                <MessageBar
                  user={this.state.messageUser}
                  reset={this.resetState}/>
              }
            </Drawer>
    )
}

export default MessageCentre;
