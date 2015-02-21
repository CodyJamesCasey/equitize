var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    validator   = require('validator'),
    request     = require('superagent'),
    passport    = require('passport');

var log     = require('../log');

exports.route = function(app) {
    app.post('/api/register/user', function(req, res) {
        // If we're already logged in, send a 401
        if (req.user) {
            return res.status(403).send('Cannot register a user while logged in');
        }
        // Validate input
        var problems = [];
        if (!validator.matches(req.body.firstName, /[a-zA-Z_\-]{2,}/)) {
            problems.push({
                field: 'firstName',
                message: 'Must be at least two letters long'
            });
        }
        if (!validator.matches(req.body.lastName, /[a-zA-Z_\-]{2,}/)) {
            problems.push({
                field: 'lastName',
                message: 'Must be at least two letters long'
            });
        }
        if (!validator.matches(req.body.userName, /[a-zA-Z0-9\.]{6,20}/)) {
            problems.push({
                field: 'userName',
                message: 'Must be between 6 and 18 alphanumeric characters long'
            });
        }
        if (!validator.matches(req.body.password, /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/)) {
            problems.push({
                field: 'password',
                message: 'Must have one digit, lowercase letter, uppercase letter, special symbol and be between 6 and 20 characters long'
            });
        }
        if (!validator.isEmail(req.body.email)) {
            problems.push({
                field: 'email',
                message: 'Must be a correctly formatted email address'
            });
        }
        // Yell at the requester if ill-formatter
        if (problems.length > 0) {
            return res.status(400).json(problems);
        }
        // Prepare to talk to the database
        var responseSent = false;
        async.waterfall([
            function(callback) {
                // Check if the userName is taken
                req.models.User.count({
                    where: {
                        userName: req.body.userName
                    }
                }).on('success', function(count) {
                    if (count > 0) {
                        res.status(400).json([{
                            field: 'userName',
                            message: 'This user name has already been taken'
                        }]);
                        responseSent = true;
                        callback('User name already taken');
                    } else callback();
                }).on('error', function(err) {
                    callback(err);
                });
            },
            function(callback) {
                // Check if the email is taken
                req.models.User.count({
                    where: {
                        email: req.body.email
                    }
                }).on('success', function(count) {
                    if (count > 0) {
                        res.status(400).json([{
                            field: 'email',
                            message: 'This email has already been taken'
                        }]);
                        responseSent = true;
                        callback('Email has already been taken');
                    } else callback();
                }).on('error', function(err) {
                    callback(err);
                });
            },
            function(callback) {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if (err) {
                        res.status(500).json([{
                            field: 'password',
                            message: 'The password could not be parsed - please check your connection'
                        }]);
                        responseSent = true;
                        callback('Could not hash the password');
                    } else {
                        callback(null, hash);
                    }
                });
            },
            function(hashedPassword, callback) {
                // Make the database insertion
                req.models.User.create({
                    firstName:  req.body.firstName,
                    lastName:   req.body.lastName,
                    userName:   req.body.userName,
                    password:   req.body.password,
                    email:      req.body.email
                })
                .then(function() {
                    callback();
                })
                .catch(function(err) {
                    responseSent = true;
                    callback(err);
                });
            }
        ], function(err) {
            if (err && !responseSent) {
                res.status(500).send('Problem putting new user in the database');
            } else {
                res.status(200).send();
            }
        });
    });

    app.post('/api/auth/login', passport.authenticate('local'), function(req, res) {
        // Authentication succeeded
        return res.status(200).json({
            id:         req.user.id,
            userName:   req.user.userName,
            firstName:  req.user.firstName,
            lastName:   req.user.lastName
        });
    });
};
