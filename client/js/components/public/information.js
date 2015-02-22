var React = require('react');

var Information = React.createClass({
    getInitialState: function(funds) {
        return {
            reqs: [
                {
            rule: "No cat can be left behind"
                },
                {
            rule: "Every cat needs food"
                },
                {
            rule: "Cat's love flowers"
                },
                {
            rule: "I hate cats."
                }
            ],

            summary: "We need people to go out and feed as many cats as possible"
        };

    },

    render: function(){
        var rules =[], currentRule;
        for(var i = 0; i<this.state.reqs.length; i++){
            currentRule = this.state.reqs[i];
            rules.push(
                <li className="rule">{currentRule.rule}</li>
            );
        }

        return (
        <div id="infocontainer">
            <h1>Summary</h1>
            <p id="summary">{this.state.summary}</p>
            <h1>Requirements</h1>
            <div id="reqcontainer">
                {rules}
            </div>
        </div>
        );
    }
});

module.exports = Information;
