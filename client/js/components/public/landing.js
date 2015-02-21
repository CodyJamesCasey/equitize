var React           = require('react'),
    Router          = require('react-router');

var List            = require('./list'),
    Map         = require('./map');

var LandingPage = React.createClass({

    render: function() {

        return ( 
    		<main id="landing-page">
    			<List />
    			<Map />
            </main>
        );
    }
});

module.exports = LandingPage;