import React from 'react';

import ImagePhoto from 'material-ui/svg-icons/image/photo';
import { Dialog, FlatButton } from 'material-ui';

export default class ImagePopOverButton extends React.Component {

  constructor() {
    super();
    this.state = {
      imageOpen: false,
    };
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
  }

  openImage() { this.setState({ imageOpen: true }); }
  closeImage() { this.setState({ imageOpen: false }); }

  render() {
    const imageAction = [
      <FlatButton
        onTouchTap={this.closeImage}
        label="CLOSE"
        />
    ];
    return (
      <div>
        <ImagePhoto onTouchTap={this.openImage}/>
        <Dialog
          title={this.props.title}
          modal={false}
          actions={imageAction}
          className="imgDia"
          open={this.state.imageOpen}
        >
          <img
            className="fillDiv"
            src={this.props.image}
          />
        </Dialog>
      </div>
    )
  }
}
