import React from 'react';

import { browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { Snackbar, RaisedButton, FlatButton } from 'material-ui';

import { insertImageItem } from '../../api/ImageItems/methods.js';
import { insertFoodItems } from '../../api/FoodItems/methods.js';

import PhotoUpload from './PhotoUpload';
import AddLocation from './AddLocation';
import AddItem from './AddItem';
import FoodItemListAddContainer from '../containers/FoodItemListAddContainer';

const ItemCreation = React.createClass({

  getInitialState() {
    return {
      finished: false,
      stepIndex: 0,
      completedIndex: 0,

      imageID: '',
      imagePreview: '',

      imageItemID: '',

      //For the snackbar
      open: false
    }
  },

  //Snackbar code

  handleError() {
    this.setState({open: true});
  },

  handleRequestClose() {
    this.setState({open: false});
  },

  //Stepper Code
  handleNext() {

    stepIndex = this.state.stepIndex;
    if ((stepIndex + 1) == this.state.completedIndex) {
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2
      });
    } else {
      this.handleError()
    }
  },

  handlePrev() {
    const stepIndex = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  },

  onUpload(imageID) {
    this.setState({imageID: imageID, completedIndex: 1})
  },

  onCoordSelection(location) {
    const insertItem = {
      imageID: this.state.imageID,
      location: {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      },
    }
    const imageItemID = insertImageItem.call(
                          insertItem
                        )
    this.setState({
      latLng: {
        lat: location.latLng.lat(),
        lng: location.latLng.lng()
      },
      address: location.address,
      completedIndex: 2,
      imageItemID: imageItemID
    });
  },

  handleSubmit({foodName, portions}) {
    const foodItem = {
      imageItemID: this.state.imageItemID,
      imageID: this.state.imageID,
      foodName: foodName,
      portions: portions,
    }
    insertFoodItems.call(foodItem)
  },

  genStepButtons(step) {

    const {stepIndex} = this.state;

    return (
      <div style={{
          margin: '12px 0'
        }}>
        <RaisedButton
          label={stepIndex === 2
            ? 'Share Food!'
            : 'Next'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={stepIndex === 3
              ? browserHistory.push('/')
              : this.handleNext}
              style={{
                marginRight: 12
              }}/>
              {step > 0 && (
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                  onTouchTap={this.handlePrev}/>
              )
            }
          </div>
        );
      },

      render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {
          margin: '0 16px'
        };

        return (
          <div style={{
              width: '100%',
              maxWidth: 700,
              margin: 'auto'
            }}>
            <Stepper
              activeStep={stepIndex}
              orientation="vertical">
              <Step>
                <StepLabel>
                  Upload a Photograph of the Item(s)
                </StepLabel>
                <StepContent>
                  <PhotoUpload onUpload={this.onUpload}/>
                  {this.genStepButtons(0)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  Add the Location of the Item(s)
                </StepLabel>
                <StepContent>
                  <AddLocation onCoordSelection={this.onCoordSelection}/>
                  {this.genStepButtons(1)}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>
                  If you have multiple items, please add them seperatly!
                </StepLabel>
                <StepContent>
                  <FoodItemListAddContainer imageItemIDFilter={this.props.imageItemID}/>
                  <br/>
                  <AddItem handleSubmit={this.handleSubmit}/>
                  <br/>
                  {this.genStepButtons(2)}
                </StepContent>
              </Step>
            </Stepper>

            <Snackbar
              open={this.state.open}
              message="Please complete this section before moving on."
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />

          </div>
        );

      }
    });

    export default ItemCreation;

import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor'

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';

import {
    Snackbar,
    TextField,
    RaisedButton,
    FlatButton,
    Dialog,
    Paper,
    Styles,
    Swipe,
    Tab,
    Tabs,
    IconButton,
} from 'material-ui';

import {ImagePhotoCamera } from 'material-ui/svg-icons/image/photo-camera';
import {EditorModeEdit } from 'material-ui/svg-icons/editor/mode-edit';
import {MapsPlace } from 'material-ui/svg-icons/maps/place';

import PhotoUpload from '/imports/ui/components/Images/PhotoUpload.jsx';
import AddLocation from '/imports/ui/components/Maps/AddLocation.jsx';
import AddItem from '/imports/ui/components/ItemCreation/AddItem.jsx';
import AddItemView from '/imports/ui/components/ItemCreation/AddItemView.jsx';


const errContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

const paperStyle = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

const ItemCreation = React.createClass({


    getInitialState(){
        return{
            //State for the stepper
	    finished: false,
	    stepIndex: 0,
	    completedIndex: 0,
	    
	    //Once the image is uploaded this gets set with the query for the items
	    imageURL:'{not:/*/}',
	    //For the snackbar
	    open:false,
	}
    },

    //Snackbar code

    handleError() {
        this.setState({
            open: true,
	});
    },

    handleRequestClose() {
        this.setState({
            open: false,
	});
    },

    //Stepper Code 
    handleNext() {

        stepIndex = this.state.stepIndex;
        if((stepIndex+1) == this.state.completedIndex){
            this.setState({
		stepIndex: stepIndex + 1,
		finished: stepIndex >= 2,
	    });
	} else {
	    this.handleError()
	}
    },

    handlePrev(){
        stepIndex = this.state.stepIndex;
        if (stepIndex > 0){
            this.setState({stepIndex: stepIndex - 1});
	}
    },

    onUpload(url){
    	console.log("onUpload sprung")
        this.setState({
        	imageURL:url,
	        completedIndex:1
	    })

    },

    onCoordSelection(location){
        this.setState({latLng:{lat:location.latLng.lat(),lng:location.latLng.lng()},
	               address:location.address,
		       completedIndex:2
	})

    },

	handleSubmit(item){
		FoodItemsC.insert({
			foodName: item.name,
			portionNo: item.portions,
			portionsClaimed: 0,
			imgURL: this.state.imageURL,
			location:this.state.latLng,
			address:this.state.address,
			owner: Meteor.userId(),					// _id of logged in user
			username: Meteor.user().username,		// username of logged in user
			createdAt: new Date()					// current time
		});
		this.setState({completedIndex:3})
	},
    
    genStepButtons(step) {

        const {stepIndex} = this.state;

        return (
			<div style={{margin: '12px 0'}}>
				<RaisedButton
					label={stepIndex === 2 ? 'Share Food!' : 'Next'}
					disableTouchRipple={true}
					disableFocusRipple={true}
					primary={true}
					onTouchTap={stepIndex === 3 ? browserHistory.push('/')  : this.handleNext}
					style={{marginRight: 12}}
				/>
				{step > 0 && (
					<FlatButton
						label="Back"
						disabled={stepIndex === 0}
						disableTouchRipple={true}
						disableFocusRipple={true}
						onTouchTap={this.handlePrev}
					/>
				)}
			</div>
			);
    },

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
			<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
				<Stepper activeStep={stepIndex} orientation="vertical">
					<Step>
						<StepLabel>Upload a Photograph of the Item(s)</StepLabel>
						<StepContent>
							<PhotoUpload onUpload={this.onUpload}/>
							{this.genStepButtons(0)}
						</StepContent>
					</Step>
					<Step>
						<StepLabel>Add the Location of the Item(s)</StepLabel>
						<StepContent>
							<AddLocation onCoordSelection={this.onCoordSelection}/>
							{this.genStepButtons(1)}
						</StepContent>
					</Step>
					<Step>
						<StepLabel>If you have multiple items, please add them seperatly!</StepLabel>
						<StepContent>
							<p>Render FoodItems Here</p>
							<br/>
							<AddItem handleSubmit = {this.handleSubmit}/>
							<br/>
							{this.genStepButtons(2)}
						</StepContent>
					</Step>
				</Stepper>

		<Snackbar
		    open={this.state.open}
		    message="Please complete this section before moving on."
		    autoHideDuration={4000}
		    onRequestClose={this.handleRequestClose}
		/>
	    </div>
	);
	
    }
});

export default ItemCreation;
