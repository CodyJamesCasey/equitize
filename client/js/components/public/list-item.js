var React           = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper;


var ListItem = React.createClass({

	getDefaultProps: function(){
		return{

			firstName: 'Cody',
			lastName: 'Casey'
		}
	},

	render: function(){
		var firstName = this.props.firstName;
		var lastName = this.props.lastName;
		return(
			<Paper zDepth={1} innerClassName="list-item">
				<div className ="list-item">
					<h3>
					{firstName} {lastName}
					</h3>
					<h4>
						Here is the description of the task that can be done. 
						I'm not really sure how long to make it, but whatevz.
					</h4>
				</div>
			</Paper>
		)
	}
});

module.exports = ListItem;