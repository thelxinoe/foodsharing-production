import { Meteor } from 'meteor/meteor';

import React from 'react';

Comment = React.createClass({

  render(){
    var container = "commentFlexOther-container";
    var item = "commentFlex-item";
    if (this.props.username == this.props.user){
      container = "commentFlexUser-container";
      item = "commentFlexUser-item";
    }
    console.log('avatar',this.props.avatar)
    const avatarUrl = this.props.avatar[this.props.username].avatar().url({store:'images'})//avatarThing.avatar().url({store:'images'})
    return(
      <div>
        { this.props.same ?
          ""
          :
          <div style={{height: "10px"}}></div>
        }
        <div className={container}>
          <div className={item}>
            { this.props.same ?
              <div style={{height: "4px", width: "40px"}}>
              </div>
              :
              <div>
                <img
                  className="avatar"
                  src={ avatarUrl } />
                <br/>
                {this.props.date}
              </div>
            }
          </div>
          <div className={item}>
            {this.props.comment}
          </div>
        </div>
      </div>
    );
  }

});

export default Comment;
