var React = require('react');

var FunderList = React.createClass({
    getInitialState: function(funds) {
        return {
            funders: [
                {
                    name: 'Ryan',
                    amount: 2000,
                    pictureUrl: "http://www.dramafever.com/st/image-boss/resize.jpg?url=http%3A%2F%2Fwww.dramafever.com%2Fst%2Fimg%2Fepth%2F4107_13.jpg&w=200"
                
                },
                {
                    name: 'Chris',
                    amount: 1500,
                    pictureUrl: "http://www.dramafever.com/st/image-boss/resize.jpg?url=http%3A%2F%2Fwww.dramafever.com%2Fst%2Fimg%2Fepth%2F4107_13.jpg&w=200"
                
                },
                {
                    name: 'Jim',
                    amount: 300,
                    pictureUrl: "http://www.dramafever.com/st/image-boss/resize.jpg?url=http%3A%2F%2Fwww.dramafever.com%2Fst%2Fimg%2Fepth%2F4107_13.jpg&w=200"
                
                },
                {
                    name: 'Chris',
                    amount: 1500,
                    pictureUrl: "http://www.dramafever.com/st/image-boss/resize.jpg?url=http%3A%2F%2Fwww.dramafever.com%2Fst%2Fimg%2Fepth%2F4107_13.jpg&w=200"
                },
                {
                    name: 'Chris',
                    amount: 1500,
                    pictureUrl: "http://www.dramafever.com/st/image-boss/resize.jpg?url=http%3A%2F%2Fwww.dramafever.com%2Fst%2Fimg%2Fepth%2F4107_13.jpg&w=200"
                }
            ]
        };
    },

    render: function() {
        var funderElements = [], currentFunder;
        for(var i = 0; i<this.state.funders.length; i++) {
            currentFunder = this.state.funders[i];
            funderElements.push(
                <div id="cluster">
                    <div className="funderpic" style={{backgroundImage: 'url('+currentFunder.pictureUrl+')'}}></div>
                    <p className="fundertitle">{currentFunder.name}</p>
                    <p className="contribamount">${currentFunder.amount}</p>
                </div>
            );

        }
        
        return (
        <div id="funderlist">
         {funderElements}
         {funderElements}
         {funderElements}
        </div>

        );
    }
});

module.exports = FunderList;
