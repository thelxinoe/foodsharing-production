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
				open: true,
		};
	}

  handleClose(){
    this.setState({open: false});
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
      <div>
        <Dialog
          title={this.props.text}
          actions={actions}
          modal={this.props.modal}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          Please try again...
        </Dialog>
      </div>
    );
  }
}