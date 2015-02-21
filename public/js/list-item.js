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
			<div>
				{firstName} {lastName}
			</div>
		)
	}
});