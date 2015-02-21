var Sequelize   = require('sequelize');

var models      = require('./models'),
    util        = require('./util'),
    log         = require('./log');

var match   = util.env.dbConnString.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/),
    name    = match[5],
    user    = match[1],
    pass    = match[2],
    port    = match[4],
    host    = match[3],
    db      = new Sequelize(name, user, pass, {
        dialect:    'postgres',
        protocol:   'postgres',
        port:       port,
        host:       host,
        logging:    log.details
    });

module.exports = {
    setup: function(app, callback) {
        callback();
        models.model(db, function(err, modelMap) {
            if (err) callback(err);
            else {
                // Add to the exports object
                module.exports.models = modelMap;
                // Synchronize with the database
                db.sync({}).then(function() {
                    // Add middleware to make models accessible in request object
                    app.use(function(req, res, next) {
                        req.models = modelMap;
                        next();
                    });
                    log.info('Database configuration completed');
                    callback();
                }).catch(function(err) {
                    callback(err);
                });
            }
        });
    },
};
