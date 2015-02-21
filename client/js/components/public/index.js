/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Header          = require('./header'),
    Footer          = require('./footer');

var RouteHandler    = Router.RouteHandler;

var PublicPageWrapper = React.createClass({
    mixins: [
        Router.State
    ],
    render: function() {
        // Get the route name
        var routeName = this.getRoutes().reverse()[0].name || 'landing';
        // Return the public page DOM
        return (
            <div id="public">
                <Header />
                <RouteHandler component="div" key={routeName}/>
                <Footer />
            </div>
        );
    }
});

module.exports = PublicPageWrapper;