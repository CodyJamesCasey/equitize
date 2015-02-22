var React           = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper;
	RaisedButton = mui.RaisedButton;



var CreateFund = React.createClass({

	getDefaultProps: function(){
		return{
			image: '/static/img/cute-cat.jpg'
		}
	},

	render: function(){
		var title = this.props.title,
			description = this.props.description,
			amount = this.props.amount,
			daysleft = this.props.days-left,
			image = this.props.image;
		return(
			<Paper zDepth={1} innerClassName="list-item">
				<div className ="list-item">
					<div>
						<img></img>
					</div>
					<h3>
						{title}
					</h3>
					<div>
						<RaisedButton label="More" primary={true} />
						<span>{daysleft}</span>
						<span>{amount}</span>
					</div>
				</div>
			</Paper>
		)
	}
});

module.exports = CreateFund;