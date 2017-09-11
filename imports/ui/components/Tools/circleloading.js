import CircularProgress from 'material-ui/CircularProgress'
import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class Loading extends React.Component{

  render() {
	return (
	  <div className="fillDivNoScroll">    
	  
       <Spinner
        size={120}
        spinnerColor={"#3371FF"}
        spinnerWidth={4}
        visible={true} />
      
	  </div>
	);
}}