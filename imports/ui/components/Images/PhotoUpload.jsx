import React from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';

import Snackbar from 'material-ui/Snackbar';

import Dropzone from 'react-dropzone';

export default class PhotoUpload extends React.Component{

	constructor(props) {
		super(props);
		this.onDrop = this.onDrop.bind(this);
		this.state = {
				imageUpload:'',
				open: false,
		};
	}

	onDrop(file){
		console.log("onDrop called")
	//A call back to handle the error with a toast
		// var callBackError = (function(err){
		// 	console.log("callback error called")
		// 	console.log(err)
		// 	this.setState({open:true})
		// }).bind(this);

		// //This function is here just so we can actually push to scope
		// var callBackState = (function(imageUrl){
		// 	console.log("callBackState called")
		// 	console.log(imageUrl);
		// 	this.setState({imageUpload:imageUrl});
		// 	console.log(this.state.imageUpload)
		// }).bind(this);

		this.setState({imageUpload:file[0].preview});
		this.props.onUpload(file[0].preview)
		console.log(this.state.imageUpload)
		// //Initiate insert and get fileObj handle
		// images.push(file, function(err,fileObj){
		// 	console.log("images.push called..")
		// 	if(err){
		// 		//do something to handle errors that get thrown
		// 		callBackError(err)
		// 		console.log(err)
		// 		console.log("didnt like it")
		// 	} else {
		// 		//Check the database and find out when all data is uploaded then call the call back
		// 		console.log("attempting...")
		// 		var liveQuery = images.find(fileObj._id).observe({
		// 			changed : function(newImage, OldImage){
		// 				if (newImage.url() != null){
		// 					liveQuery.stop();
		// 					console.log(newImage.url())
		// 					callBackState(newImage.url());
		// 				}
		// 			}
		// 		});
		// 	}
		// });
	}




	render() {
		return (
			<div>
				<Dropzone onDrop={this.onDrop} multiple={false}>
					{this.state.imageUpload == '' ?
						<div>Drop files here for upload</div>
					:
						<img style={{display: "block", margin: "0 auto"}} height="100%" src={this.state.imageUpload} />}
				</Dropzone>
				<Snackbar
					open={this.state.open}
					message="Sadly an error has occured, please try to upload your image again."
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
	}

}
