import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};


export default class PopUp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
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
      </div>
    );
  }
}