var React           = require('react'),
    Router          = require('react-router'),
    mui = require('material-ui'),
	Paper = mui.Paper,
	RaisedButton = mui.RaisedButton,
	FloatingActionButton = mui.FloatingActionButton;

var ListItem            = require('./list-item');

var List = React.createClass({
    // React functions
    getDefaultProps: function() {
        return {
            funds: []
        };
    },
    render: function(){
        var rowElements = [], currentFund, daysLeft;
        for (var i = 0; i < this.props.funds.length; i++) {
            currentFund = this.props.funds[i];
            // Figure out days left
            daysLeft = (currentFund.deadline - (new Date()).getTime()) / (1000 * 60 * 60 * 24);

            rowElements.push(
            	<Paper zDepth={1} innerClassName="list-item">
					<div className ="list-item">
	                    <h3>{currentFund.title}</h3>
	                    <div>
							<RaisedButton className="button" label="More" primary={true} />
							<div className="bot-right-card">
								<div className="days-left"><span className="icon"></span>{daysLeft}</div>
			                    <div className="amount"><span className="icon"></span>{currentFund.amount}</div>
		                    </div>
	                    </div>
	                </div>
				</Paper>
            );
        }

        return (
        	<div>
	        	<Paper zDepth={1}>
	        		<div id="list-head">
			    	<h2>Current Funds</h2>
			    	<FloatingActionButton iconClassName="muidocs-icon-action-grade" />
			    	</div>
	        	</Paper>
	            <div id="list">
	                {rowElements}
	            </div>
            </div>
        );
    }
});

module.exports = List;
