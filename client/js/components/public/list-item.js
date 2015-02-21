var React           = require('react');

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
			<div className ="list-item">
				<h3>
				{firstName} {lastName}
				</h3>
			</div>
		)
	}
});

module.exports = ListItem;