import CircularProgress from 'material-ui/CircularProgress'
import Spinner from 'react-spinner-material';
import React, { Component } from 'react';

export default class LoadingSmall extends React.Component{

  render() {
	return (
	  <div style={{
      position: 'relative',     
      right: '15px',
      top: '15px',
    }}>    
	  
       <Spinner
        size={30}
        spinnerColor={"#3371FF"}
        spinnerWidth={2}
        visible={true}
      />
      
	  </div>
	);
}}