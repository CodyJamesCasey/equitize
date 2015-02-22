var request = require('superagent');

var FundService = {
    getFunds: function(latitude, longitude, callback) {
        request
            .get('/api/funds')
            .query({
                latitude: latitude,
                longitude: longitude,
            })
            .end(callback);
    }
};

module.exports = FundService;
