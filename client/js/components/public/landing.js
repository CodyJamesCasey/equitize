var React           = require('react'),
    Router          = require('react-router');

var List            = require('./list'),
    Map         = require('./map');

var EventBus        = require('../../eventbus'),
    Events          = require('../../events');

var LocalizeMixin   = require('../../mixins/localize');

var FundService     = require('../../services/funds');

var AppState        = require('../../appstate');

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
    // React functions
    getInitialState: function() {
        return {
            funds: AppState.funds
        };
    },
    componentWillMount: function() {
        // Localize all external listeners
        this.localize('onFundsLoaded');

        // Setup event listeners
        EventBus.on(Events.FUNDS_LOADED, this.onFundsLoaded);

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
    },
    componentWillUnmount: function() {
        // Unregister event listeners
        EventBus.off(Events.FUNDS_LOADED, this.onFundsLoaded);
    },
    render: function() {
        if (this.state.funds.length > 0) {
            return (
                <main id="landing-page">
                    <List funds={this.state.funds} />
                    <Map funds={this.state.funds} />
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
