import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import NumberOptions from './NumberOptions';
import YourItemsContainer from '../containers/YourItemsContainer';
import Loading from './Tools/circleloading';

const AddItem = React.createClass({

  getInitialState(){
    return{
      foodName:'',
      prtNo:1,
      open:false,
      weight:0
    }
  },
  setPrtNo(prtNo){
    this.setState({prtNo:prtNo});
  },
  setWeight(event){
    this.setState({weight:event.target.value})
  },
  handleName(event){
    this.setState({foodName:event.target.value});
  },
  handleRequestClose(){
    this.setState({open:false});
  },
  handleSubmit(){
    if((this.state.foodName == '')){
      this.setState({open:true});
    }else{
      this.props.handleSubmit({
        foodName: this.state.foodName,
        portions:this.state.prtNo,
        weight:this.state.weight,
      });
      this.setState({
        foodName:'',
        prtNo:1,
        weight:0
      });
    }
  },
  render() {
    return (
      this.props.loading ? <Loading />: 
      <div>

        <div className="textBox">

          <TextField
            id={toString(Math.random())}
            hintText="Please enter name of the item."
            value={this.state.foodName}
            onChange={this.handleName}
            />

        </div>
        <br />
        <div className="textBox">
          Number of Portions:
        <NumberOptions
          id={toString(Math.random())}
          value={this.state.prtNo}
          options="20"
          optionChange={this.setPrtNo}
        />
      </div>
      <br />
      <div className="textBox">
        Item weight in grams:
        <TextField
          id={toString(Math.random())}
          value={this.state.weight}
          type='number'
          onChange={this.setWeight}
        />
      </div>
      <p>
        Fill this in for each item in your picture! We need the weight to
        continue to get our funding, please help us!
      </p>
      <RaisedButton
        label="Add Item"
        primary={true}
        fullWidth={true}
        onTouchTap={this.handleSubmit}
      />
    <YourItemsContainer
        imageItemIDFilter={this.props.imageItemIDFilter}
      />
      <Snackbar
        open={this.state.open}
        message="Please fill out all fields."
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
        />
    </div>
  
  );
}

});
export default AddItem;
