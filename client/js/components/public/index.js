/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var RouteHandler    = Router.RouteHandler;

var PublicPageWrapper = React.createClass({
    mixins: [
        Router.State
    ],
    componentDidMount: function() {
        // Get the session immediately
        AuthService.getSession(function(err, res) {
            if (err) {
                // TODO create mechanism to report network problems
                console.log('Could not get session', err);
            } else {
                // TODO repair this mechanism
                // Actions.declareSessionDataLoaded(res.body);
            }
        });
    },
    render: function() {
        // Get the route name
        var routeName = this.getRoutes().reverse()[0].name || 'landing';
        // Return the public page DOM
        return (
            <div id="public">
                <RouteHandler component="div" key={routeName}/>
            </div>
        );
    }
});

module.exports = PublicPageWrapper;