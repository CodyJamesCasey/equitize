var fs      = require('fs'),
    path    = require('path'),
    async   = require('async');

var log     = require('../log');

exports.route = function(app, callback) {
    fs.readdir(__dirname, function(err, files) {
        if (err) callback(err);
        else {
            async.each(files, function(file, callback) {
                try {
                    if (file !== 'index.js' && (file.indexOf('.js', file.length - 3) !== -1)) {
                        var routeModule = require(path.join(__dirname, file));
                        if (routeModule && routeModule.route) {
                            log.debug('Loading routes from ' + file);
                            routeModule.route(app);
                        }
                    }
                    callback();
                } catch (err) {
                    callback(err);
                }
            }, function(err) {
                if (err) callback(err);
                else {
                    // Login page route
                    log.debug('Loading login page route');
                    app.get('/login', function(req, res) {
                        if (req.user) {
                            res.redirect('/');
                        } else {
                            res.sendFile(path.join(__dirname, '..', '..', 'dist', 'pages', 'login.html'));
                        }
                    });
                    // Adding the test route
                    // TODO DELETE THIS BULLSHIT
                    app.get('/test*', function(req, res) {
                        res.sendFile(path.join(__dirname, '..', '..', 'dist', 'pages', 'index.html'));
                    });
                    // Main page route must be added _after_ all the others
                    log.debug('Loading main page route');
                    app.get('/*', function(req, res) {
                        if (req.user) {
                            res.sendFile(path.join(__dirname, '..', '..', 'dist', 'pages', 'index.html'));
                        } else {
                            res.redirect('/login');
                        }
                    });
                    // All routing now complete
                    log.info('Endpoint routing completed');
                    callback();
                }
            });
        }
    });
};
