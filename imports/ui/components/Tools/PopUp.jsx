import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {
  lightGreenA200,
  lightGreen600,
  green900,
  blueGrey300,
  blueGrey900,
  blueGrey600,
  grey50,
} from 'material-ui/styles/colors';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

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


export default class PopUp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
				open: true,
				open: false,
		};
	}

  handleClose(){
    this.setState({open: false});
  }

  handleOpen(){
    this.setState({open: true});
    console.log("pop up opened")
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div style={{height: '100%', width: '100%'}}>
      <MuiThemeProvider muiTheme={muiTheme}>

      {this.handleOpen()}

        <Dialog
          title={this.props.tit}
          actions={actions}
          modal={this.props.modal}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          {this.props.text}
        </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}