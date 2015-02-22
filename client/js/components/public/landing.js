var React           = require('react'),
    Router          = require('react-router'),
    mui             = require('material-ui');

var List            = require('./list'),
    Map         = require('./map');

var EventBus        = require('../../eventbus'),
    Events          = require('../../events');

var LocalizeMixin   = require('../../mixins/localize');

var FundService     = require('../../services/funds');

var AppState        = require('../../appstate');

var FloatingActionButton = mui.FloatingActionButton;

var LandingPage = React.createClass({
    mixins: [
        LocalizeMixin
    ],
    // Listeners
    onFundsLoaded: function(funds) {
        this.setState({
            funds: funds
        });
    },
    onLocationLoaded: function(position) {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },
    // React functions
    getInitialState: function() {
        return {
            funds: AppState.funds,
            latitude: AppState.latitude,
            longitude: AppState.longitude
        };
    },
    componentWillMount: function() {
        // Localize all external listeners
        this.localize('onFundsLoaded');
        this.localize('onLocationLoaded');

        // Setup event listeners
        EventBus.on(Events.FUNDS_LOADED, this.onFundsLoaded);
        EventBus.on(Events.LOCATION_LOADED, this.onLocationLoaded);

        // Check if we have to load funds
        if (this.state.funds.length < 1) {
            FundService.getFunds(40, -75, function(err, res) {
                if (res.ok) {
                    EventBus.emit(Events.FUNDS_LOADED, res.body);
                } else {
                    console.log('Things didn\'t work out:', res);
                }
            });
        }
        // Check if we have our location
        navigator.geolocation.getCurrentPosition(function(position) {
            EventBus.emit(Events.LOCATION_LOADED, position);
        });
    },
    componentWillUnmount: function() {
        // Unregister event listeners
        EventBus.off(Events.FUNDS_LOADED, this.onFundsLoaded);
        EventBus.off(Events.LOCATION_LOADED, this.onLocationLoaded);
    },
    render: function() {
        if (this.state.funds.length > 0) {
            return (
                <main id="landing-page">
                    <List funds={this.state.funds} />
                    <Map funds={this.state.funds} latitude={this.state.latitude} longitude={this.state.longitude}/>
                    <FloatingActionButton id="plus-button" iconClassName="muidocs-icon-action-grade" zDepth={5} secondary={true} />
                </main>
            );
        } else {
            return (
                <main id="landing-page">
                    <div className="no-funds">
                        There are currently no active funds.
                    </div>
                </main>
            );
        }
    }
});

module.exports = LandingPage;
