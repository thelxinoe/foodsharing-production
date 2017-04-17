import React from 'react';
import Dropzone from 'react-dropzone';
import Snackbar from 'material-ui/Snackbar';

import { Images } from '../../api/Images/Images';

import { Meteor } from 'meteor/meteor';
const images = Meteor.subscribe('images');

const PhotoUpload = React.createClass({

    getInitialState() {
        return ({
          imageUpload: '',
          open: false
        })
    },

    onDrop(file) {
      const callback = function (err, fileObj){
        if (err){
          this.setState({open: true})
        } else {
          this.props.onUpload(fileObj._id, file[0].preview)
        }
      }
      this.setState({imageUpload:file[0].preview})
      Images.insert(file[0], callback.bind(this));
    },

    render() {
        return (
            <div>
                {this.state.imageUpload == '' ?
                <Dropzone onDrop={this.onDrop} multiple={false}>
                  <div>Drop files here for upload</div>
                </Dropzone>
                : <img width="100%" src={this.state.imageUpload}/>}
              <Snackbar open={this.state.open}
                message="Sadly an error has occured please try to upload your image again."
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
            </div>
        );
    }

});
export default PhotoUpload;
