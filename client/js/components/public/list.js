var React           = require('react'),
    Router          = require('react-router');

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
                <div className="row">
                    <div className="title">{currentFund.title}</div>
                    <div className="description">{currentFund.description}</div>
                    <div className="amount">{'$' + currentFund.amount}</div>
                    <div className="days-left">{daysLeft}</div>
                </div>
            );
        }

        return (
            <div id="list">
                {rowElements}
            </div>
        );
    }
});

module.exports = List;
