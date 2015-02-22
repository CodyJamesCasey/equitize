var React           = require('react');

var NotFound = React.createClass({

    render: function() {

        return ( 
    		<div>
    		  <img src="http://24.media.tumblr.com/tumblr_mcejwgkb3m1r5feuio1_500.gif" className="404">
    		</div>
        );
    }
});

module.exports = NotFound;