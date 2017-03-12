import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
  browserHistory,
} from 'react-router';

import AppBar from 'material-ui/AppBar';

import {
  Dialog,
  IconButton,
  Tabs,
  Tab,
  FlatButton,
  Snackbar,
  Toolbar,
  ToolbarGroup,
} from 'material-ui';

import SvgIcons from 'material-ui/svg-icons';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import MapsMap from 'material-ui/svg-icons/maps/map';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';


import MessageCentreButtonContainer from '../containers/MessageCentreButtonContainer';
import MessageCentre from './MessageCentre';
import PrivateChatDrawer from './PrivateChatDrawer'

const logoutContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

import {
  lightGreenA200,
  lightGreen600,
  green900,
  blueGrey300,
  blueGrey900,
  blueGrey600,
  grey50,
} from 'material-ui/styles/colors';

import { Scrollbars } from 'react-custom-scrollbars';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightGreenA200,
    primary2Color: lightGreen600,
    primary3Color: green900,
    accent1Color: blueGrey300,
    accent2Color: blueGrey600,
    accent3Color: blueGrey900,
    alternateTextColor: green900
  },
  textField: {
    textColor: green900
  },
  card: {
    titleColor: green900
  },
  snackbar: {
    textColor: grey50
  }
});

const tabStyle = {
  color: green900
};

const AppHeader = React.createClass({

  contextTypes: {
    router: React.PropTypes.object,
  },

  childContextTypes: {
    location: React.PropTypes.object
  },

  getInitialState() {
    return {
      messageUser: '',
      openLogout: false,
      openLogMess: false,
      filter: ''
    }
  },

  getChildContext() {
    return {
      location: this.props.location
    }
  },


  filterList(event) {
    this.setState({filter: event});
  },

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    var childs = el.getElementsByTagName("h1");
    var h1 = childs[0];
    h1.style["background-image"] = 'url("/imgs/LogoNameMedium.png")';
    h1.style["background-size"] = "auto 85%";
    h1.style["background-repeat"] = "no-repeat";
    h1.style["background-position"] = "center";

    var h2 = childs[1];
    h2.style["color"] = "#1b5e20";
  },

  handleLogout: function() {
    Meteor.logout();
    this.setState({openLogout: false});
    browserHistory.push('/');
    this.logOutPop();
  },

  logOutPop: function() {
    this.setState({openLogMess: true});
  },

  handleOpen: function() {
    this.setState({openLogout: true});
  },

  handleClose: function() {
    this.setState({openLogout: false});
  },

  handleRequestClose: function() {
    this.setState({openLogMess: false});
  },

  handlePassChange: function() {
    browserHistory.push('/Login');
    this.setState({openLogout: false});
  },

  handleActiveTab: function(path) {
    activeTab = function(event) {
      browserHistory.push(path);
    }
    return activeTab
  },
  resetState: function() {
    this.setState({messageUser: ''});
  },

  handleOpenMessage: function(user) {

    this.setState({openNav: true, messageUser: user});
  },

  handleBackClick: function() {
    this.context.router.goBack();
  },

  render: function() {
    const actions = [
      < FlatButton
      label = "Logout"
      primary = {
        true
      }
      onTouchTap = {
        this.handleLogout
      } />
      ,
      < FlatButton
      label = "Change Password"
      primary = {
        true
      }
      onTouchTap = {
        this.handlePassChange
      } />
      ,
      < FlatButton
      label = "Cancel"
      secondary = {
        true
      }
      onTouchTap = {
        this.handleClose
      } />
    ];

    return (
      <div className="bigBoy">
        <MuiThemeProvider muiTheme={muiTheme}>
          <div className="phone">
            <div className="container">

              <div className="headContain">
                <AppBar
                  title=""
                  iconElementLeft={
                    < IconButton onTouchTap = {
                        this.handleBackClick
                      } >
                      <SvgIcons.ContentReply color={green900}/>
                      < /IconButton>
                    }
                    iconElementRight={
                      < IconButton containerElement = {
                          < Link to = {
                              '/ItemCreation'
                            } />
                          } >
                          <SvgIcons.ContentAddCircle color={green900}/>
                          < /IconButton>
                        }
                        />
                      </div>
                      <div className="toolContain">
                        <Toolbar>
                          <ToolbarGroup firstChild={true}>
                            {Meteor.userId()
                              ?
                              <div>
                                <IconButton
                                  onTouchTap={this.handleOpen}
                                  tooltip="Account"
                                  tooltipPosition="bottom-right">
                                  <SvgIcons.ActionAccountCircle color='White'/>
                                </IconButton>
                                <Dialog
                                  title="Logout"
                                  actions={actions}
                                  modal={true}
                                  contentStyle={logoutContentStyle}
                                  open={this.state.openLogout}>
                                  Do you wish to logout?
                                </Dialog>
                              </div>
                              :
                              <div>
                                <IconButton
                                  containerElement={
                                    < Link to =
                                        'Login'
                                       />
                                    }
                                    tooltip="Account"
                                    tooltipPosition="bottom-right">
                                    <SvgIcons.ActionAccountCircle color='White'/>
                                  </IconButton>
                                </div>
                              }
                            </ToolbarGroup>
                            {/* <ToolbarGroup style={{
                              bottom: '35%'
                            }}>
                            <AutoComplete floatingLabelText="Search..." filter={AutoComplete.caseInsensitiveFilter} dataSource={searchNames} onUpdateInput={this.filterList} style={{
                            color: 'white'
                          }}/>
                        </ToolbarGroup> */}
                        <ToolbarGroup lastChild={true}>
                          <MessageCentreButtonContainer
                            pathname={this.props.location.pathname}
                            queryString={this.props.location.query}
                          />
                        </ToolbarGroup>
                        </Toolbar>
                      </div>

                      <div className="contentContain">
                        {this.props.location.pathname.split('/')[1]=='FoodComments'?
                          React.cloneElement(this.props.children, {
                            openMessages: this.handleOpenMessage
                          })
                        :
                        <Scrollbars
                          style={{
                            height: 350,
                            position: 'relative'
                          }}
                          >
                          {React.cloneElement(this.props.children, {
                            openMessages: this.handleOpenMessage
                          })}
                        </Scrollbars>
                      }
                      </div>

                      <div className="tabsContain">

                        <Tabs>
                          <Tab
                            icon={
                              < ActionDashboard color = {
                                  green900
                                } />
                              }
                              label="ITEM VIEW"
                              onActive={this.handleActiveTab("/")}
                              style={tabStyle}/>

                            <Tab
                              icon={
                                < MapsMap color = {
                                    green900
                                  } />
                                }
                                label="MAP VIEW"
                                onActive={this.handleActiveTab("/MapView")}
                                style={tabStyle}/>

                              <Tab
                                icon={
                                  < MapsPersonPin color = {
                                      green900
                                    } />
                                  }
                                  label="YOUR ITEMS"
                                  onActive={this.handleActiveTab("/YourItems")}
                                  style={tabStyle}/>
                              </Tabs>

                            </div>

                  <MessageCentre
                    open={this.props.location.query.openMessageCentre}
                  />
                  <PrivateChatDrawer
                    open={this.props.location.query.openPrivateChat}
                  />
                  <Snackbar
                    open={this.state.openLogMess}
                    message="You've been logged out!"
                    autoHideDuration={3600}
                    onRequestClose={this.handleRequestClose}
                    action="Close"
                    onTouchTap={this.handleRequestClose}/>
                </div>

              </div>
          </MuiThemeProvider>
        </div>
      );

    }
  });

  export default AppHeader;
