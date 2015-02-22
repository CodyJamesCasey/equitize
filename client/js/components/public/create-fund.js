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
				<div className ="form-side">
				<TextField className="form-item" hintText="Title" />
				<br></br>
				<TextField className="form-item" multiLine="true" hintText="Description" />
				<br></br>
				<TextField className="form-item" hintText="Contribution" />
				<br></br>
				<DatePicker className="form-item" hintText="Deadline" mode="landscape"/>
				</div>
				<div className ="form-side">
					<RaisedButton className="button form-item" label="Upload an Image" secondary={true} />
				</div>
				<br></br>
				<RaisedButton className="submit-button form-item" label="Submit" primary={true} />
			</Paper>
			</main>
		)
	}
});

module.exports = CreateFund;