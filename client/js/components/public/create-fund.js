var React           = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	TextField = mui.TextField,
	DatePicker = mui.DatePicker,
	RaisedButton = mui.RaisedButton;



var CreateFund = React.createClass({

	render: function(){
		return(
			<main>
			<Paper className="create-form" zDepth={5} >
				<TextField hintText="Title" />
				<TextField hintText="Description" />
				<RaisedButton secondary={true}>
					  <span className="mui-raised-button-label example-image-button">Choose an Image</span>
					  <input type="file" id="imageButton" className="example-image-input"></input>
				</RaisedButton>
				<TextField hintText="Contribution" />
				<DatePicker hintText="Deadline" mode="landscape"/>
				<RaisedButton className="button" label="Submit" primary={true} />
			</Paper>
			</main>
		)
	}
});

module.exports = CreateFund;