import React, {PropTypes} from 'react';
import Loading from './Tools/circleloading';
import Comment from './Comment';
import TimeSince from './TimeSince.jsx';

class Comments extends React.Component {

    render() {

        return (
            this.props.loading ? <Loading />:
            <div>
                {this.props.comments.map((comment) => {
                    var prvUsr;
                    var currUsr = comment.username;
                    var same = false;
                    if (currUsr === prvUsr) {
                        same = true;
                    } else {
                        prvUsr = currUsr;
                    }
                    prvUsr = currUsr;
                    return (
                        <Comment {...this.props} comment={comment.comment} date={< TimeSince time = {
                            comment.createdAt
                        } />} username={currUsr} same={same}/>
                    )
                })}
            </div>
        
        )

    }
}

export default Comments;
