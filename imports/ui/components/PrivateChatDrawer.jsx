import React, { PropTypes } from 'react';

import {
  Drawer,
  IconButton,
  AppBar,
} from 'material-ui';
import SvgIcons from 'material-ui/svg-icons';

import PrivateChat from './PrivateChat';

class PrivateChatDrawer extends React.Component {
  render() {
    var winWidth = window.innerWidth*0.83;
    return (
      <div id='drawerContainerDIv'>
        <Drawer
          containerClassName='containerRoot'
          width={winWidth}
          openSecondary={true}
          open={this.state.openNav}
          docked={false}
          onRequestChange={this.handleCloseNav}
          >
          <div className="headContain">
            <AppBar
              title={this.state.userCurr}
              iconElementLeft={
                <IconButton onTouchTap={this.handleCloseNav}>
                  <SvgIcons.ContentBackspace color={green900} />
                </IconButton>
              }
              />
          </div>
          <PrivateChat
            close={this.handleCloseNav}
            messagedUsername={this.state.userCurr} />
        </Drawer>
      </div>
  )
  }
}

export default PrivateChatDrawer;
