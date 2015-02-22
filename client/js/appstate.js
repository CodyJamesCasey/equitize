var EventBus    = require('./eventbus'),
    Events      = require('./events');

// The state of the web application
module.exports = (function() {
    var state = {
        funds: [],
        fundsLoaded: false,
        latitude: undefined,
        longitude: undefined,
        locationLoaded: false
    };

    EventBus.on(Events.FUNDS_LOADED, function(funds) {
        state.fundsLoaded = true;
        state.funds = funds;
    });

    EventBus.on(Events.LOCATION_LOADED, function(position) {
        state.locationLoaded = true;
        state.latitude = position.coords.latitude;
        state.longitude = position.coords.longitude;
    });

    return state;
})();
