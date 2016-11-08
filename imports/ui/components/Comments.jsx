import React, { PropTypes } from 'react';

import Comment from './Comment';
import TimeSince from './TimeSince.jsx';

class Comments extends React.Component {

  render () {
    const comments = this.props.comments.map((comment) => {
      var prvUsr;
      var currUsr = comment.username;
      var same = false;
      if(currUsr === prvUsr){
        same = true;
      }else{prvUsr = currUsr;}
      prvUsr = currUsr;
      return(
        <Comment
          comment={comment.comment}
          date={<TimeSince time={comment.createdAt} />}
          username={currUsr}
          same={same}
        />
      )
    });
    console.log(comments)
    return (<div>{comments}</div>);
  }
}

export default Comments;
