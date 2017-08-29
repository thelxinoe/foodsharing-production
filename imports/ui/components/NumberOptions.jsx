import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
  DropDownMenu,
  MenuItem
} from 'material-ui';

const NumberOptions = React.createClass({

  getInitialState(){
    return{
      openClaim: false,
    }
  },

  portionNumbers: function (pNo) {
    var x = [];
    for (i = 1; i <= pNo; i++){
      x.push(
        <MenuItem key={i} value={i} primaryText={i}/>
      );
    }
    return x
  },

  handleChange : function (e, index, value){
    this.props.optionChange(value);
  },

  render() {
    return(
      <DropDownMenu
        maxHeight={300}
        value={this.props.value}
        onChange={this.handleChange}>
        {this.portionNumbers(this.props.options)}
      </DropDownMenu>
    );
  },
});

export default NumberOptions;
