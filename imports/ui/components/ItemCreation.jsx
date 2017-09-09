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
      open: false,
      message: ''
    }
  },

  //Snackbar code

  handleError(message) {
    this.setState({
      open: true,
      message: message
    });
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
      this.handleError("Please complete this section before moving on.")
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

  handleSubmit({foodName, portions, weight}) {
    const foodItem = {
      imageItemID: this.state.imageItemID,
      imageID: this.state.imageID,
      foodName: foodName,
      portions: portions,
      weight: parseInt(weight)
    }
    try{
      insertFoodItems.call(foodItem)
    }
    catch(e){
      this.handleError(e)
    }
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
            onTouchTap={stepIndex === 2
              ? function(){browserHistory.push('/')}
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
                  <AddItem
                    handleSubmit={this.handleSubmit}
                    imageItemIDFilter={this.state.imageItemID}
                  />
                  <br/>
                  {this.genStepButtons(2)}
                </StepContent>
              </Step>
            </Stepper>

            <Snackbar
              open={this.state.open}
              message={this.state.message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />

          </div>
        );

      }
    });

    export default ItemCreation;
