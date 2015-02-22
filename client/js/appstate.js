var EventBus    = require('./eventbus'),
    Events      = require('./events');

// The state of the web application
module.exports = (function() {
    var state = {
        funds: [],
        fundsLoaded: false
    };

    EventBus.on(Events.FUNDS_LOADED, function(funds) {
        state.fundsLoaded = true;
        state.funds = funds;
    });

    return state;
})();
