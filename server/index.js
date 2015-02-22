var express         = require('express'),
    // General purpose imports
    path            = require('path'),
    async           = require('async'),
    // Express specific imports
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    passport        = require('passport'),
    passportVenmo   = require('passport-venmo'),
    multer          = require('multer');

var routes      = require('./routes'),
    db          = require('./db'),
    util        = require('./util'),
    log         = require('./log');

module.exports = function(done) {
    // Create the server instance
    var app = express();
    // Middleware
    // Serves our static assets
    app.use('/static', express.static(path.join(__dirname, '..', 'dist')));
    // Handle file uploads
    app.use(multer({
        dest: path.join(__dirname, '..', 'uploads'),
        rename: function(fieldname, filename) {
            return 'upload' + (new Date()).getTime() + filename;
        }
    }));
    // Parses cookies
    app.use(cookieParser());
    // Reads JSON request bodies
    app.use(bodyParser.json());
    // Reads formdata request bodies
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    // Enables cookie-based browser sessions
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: util.env.sessionSecret
    }));
    // Perform setup
    async.series([
        function(callback) {
            // Setup the database
            db.setup(app, callback);
        },
        function(callback) {
            // Setup the passport configuration
            app.use(passport.initialize());
            app.use(passport.session());

            // Setup the local passport strategy
            passport.use(new passportVenmo.Strategy({
                clientID: util.env.venmoClientId,
                clientSecret: util.env.venmoClientSecret,
                callbackURL: util.env.venmoCallbackUrl
            }, function(accessToken, refreshToken, profile, done) {
                var User        = db.models.User,
                    name        = profile.displayName,
                    email       = profile.email,
                    pictureUrl  = profile._json.profile_picture_url,
                    venmoId     = profile.id;

                User.findOrCreate({
                    where: {
                        venmoId:    venmoId,
                        email:      email,
                    },
                    defaults: {
                        name:       name,
                        pictureUrl: pictureUrl
                    }
                }).then(function(result, created) {
                    if (!result || !result.length) {
                        return done({
                            message: 'Could not authenticate user'
                        });
                    } else {
                        // We found a user matching that user name
                        return done(undefined, result[0].dataValues);
                    }
                }).catch(function(err) {
                    return done(err);
                });
            }));

            // Teach passport how to think about users in the database
            passport.serializeUser(function(user, done) {
                done(null, user.id);
            });
            passport.deserializeUser(function(req, id, done) {
                var User = req.models.User;
                User.find(id).success(function(user) {
                    done(undefined, user);
                }).error(function(err) {
                    done(err);
                });
            });

            // Passport is now ready to plow
            log.debug('Passport configuration complete');
            callback();
        },
        function(callback) {
            // Perform server routing
            routes.route(app, callback);
        },
        function(callback) {
            // Start servicing the requests
            app.listen(util.env.serverPort, callback);
        }
    ], function(err) {
        if (err) {
            log.error('Server could not start', err);
            if (done) done(err);
        } else {
            log.info('Server is listening on ' + util.env.serverPort + '\n');
            if (done) done();
        }
    });
};
