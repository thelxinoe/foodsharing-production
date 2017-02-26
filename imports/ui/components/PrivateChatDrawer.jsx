import React, { PropTypes } from 'react';

import {
  Link,
} from 'react-router';


import {
  Drawer,
  IconButton,
  AppBar,
} from 'material-ui';
import SvgIcons from 'material-ui/svg-icons';
import {
  green900,
} from 'material-ui/styles/colors';

import PrivateChatContainer from '../containers/PrivateChatContainer';

class PrivateChatDrawer extends React.Component {
  render() {
    var winWidth = window.innerWidth*0.83;
    const open = this.props.open === 'true' ? true : false;
    const queryString = Object.assign({},this.props.query,{ openPrivateChat: false });
    const closeDrawerButton =
    <IconButton
      linkButton ={true}
      containerElement = {
        <Link to={{
            pathname: this.props.pathname,
            query: queryString
          }}/>
        }
        >
        <SvgIcons.ContentBackspace
          color={green900}/>
    </IconButton>
    return (
      <div id='drawerContainerDIv'>
        <Drawer
          containerClassName='containerRoot'
          width={winWidth}
          openSecondary={true}
          open={open}
          docked={false}
          onRequestChange={this.handleCloseNav}
          >
          <div className="headContain">
            <AppBar
              title="Private Messages"
              iconElementLeft={
                closeDrawerButton
              }
              />
          </div>
          <PrivateChatContainer
            messageID = {this.props.id}
          />
        </Drawer>
      </div>
  )
  }
}

export default PrivateChatDrawer;
