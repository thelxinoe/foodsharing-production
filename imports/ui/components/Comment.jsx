import React from 'react';

Comment = React.createClass({

	tester(){
		
	},

	avatar(){
		var username = this.props.username;
		var user = Meteor.users.find({ "username" : username });
		console.log(user)
		if (user.avatar){
			return user.avatar;
		}else{
			return "http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png";
		}
	},

render(){
	var container = "commentFlexOther-container";
	var item = "commentFlex-item";
	if (this.props.username == this.props.user){
		container = "commentFlexUser-container";
		item = "commentFlexUser-item";
	}
	return(
		<div>
			{this.tester()}
			{ this.props.same ?
				""
			:
				<div style={{height: "10px"}}></div>
			}
			<div className={container} key={Math.random()}>
				<div className={item} key={Math.random()}>
					{ this.props.same ?
						<div style={{height: "4px", width: "40px"}}>
						</div>
					:
						<div>
							<img className="avatar" src={this.avatar()} />
							<br/>
							{this.props.date}
						</div>
					}
				</div>
				<div className={item} key={Math.random()}>
					{this.props.comment}
				</div>
			</div>
		</div>
	);
}

});

export default Comment;
