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
        var rowElements = [], currentFund, daysLeft, pictureUrl;
        for (var i = 0; i < this.props.funds.length; i++) {
            currentFund = this.props.funds[i];
            // Figure out days left
            daysLeft = (currentFund.deadline - (new Date()).getTime()) / (1000 * 60 * 60 * 24);
            // Get the picture
            pictureUrl = 'url(' + currentFund.pictureUrl + ')';
            console.log(currentFund);
            rowElements.push(
                <div className="card">
                    <div className="photo" style={{background: pictureUrl}}></div>
                    <div className="title">{currentFund.title}</div>
                    <div className="amount">{'$' + currentFund.amount}</div>
                    <div className="description">{currentFund.description}</div>
                    <RaisedButton className="details" label="More Details" secondary={true} />
                </div>
            );
        }

        return (
            <div>
                <div id="list">
                    {rowElements}
                </div>
            </div>
        );
    }
});

module.exports = List;
