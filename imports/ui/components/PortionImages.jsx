import React, { PropTypes } from 'react'

class PortionImages extends React.Component {

  render () {

    var pCla = this.props.portions- this.props.portionsLeft;
    var pNum = this.props.portions - pCla;
    var x = [];
    for (i = 0; i < pNum; i++){
      x.push(
        <img
          key={i}
          className="carrotImg"
          src="/imgs/carrot.png"
        />
      );
    }
    var z = [];
    for (n = 0; n < pCla; n++){
      z.push(
        <img
          key= {pNum+n}
          className="carrotImg"
          src="/imgs/noCarrot.png" />
      );
    }

    return(<div>{z}{x}({pNum})</div>)
  }
}

export default PortionImages;
