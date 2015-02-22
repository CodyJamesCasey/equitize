var fs          = require('fs'),
    path        = require('path'),
    async       = require('async'),
    geolib      = require('geolib'),
    sequelize   = require('sequelize'),
    passport    = require('passport');

var log     = require('../log'),
    util    = require('../util');

exports.route = function(app) {
    app.get('/api/funds', function(req, res) {
        if (/* !req.user */false) {
            res.status(401).send();
        } else {
            var offset      = req.query.offset || 0,
                limit       = req.query.limit || 20,
                filter      = req.query.filter,
                latitude    = parseFloat(req.query.latitude),
                longitude   = parseFloat(req.query.longitude);

            if (!latitude || !longitude) {
                return res.status(400).json({
                    message: 'The "latitude" and "longitude" parameters are all required'
                });
            }

            var opts = {
                offset: offset,
                limit: limit
            };

            if (filter) {
                opts.where = sequelize.or(
                    {
                        title: {
                            like: filter
                        }
                    },
                    {
                        description: {
                            like: filter
                        }
                    }
                );
            }

            req.models.Fund.findAll(opts)
                .then(function(results) {
                    if (!results || results.length < 1) {
                        return res.status(200).json([]);
                    } else {
                        // Sanitize the results
                        var funds = [], latlng = {
                            latitude:   latitude,
                            longitude:  longitude
                        }, fund;
                        // Get them distance
                        for (var i = 0; i < results.length; i++) {
                            fund = results[i].dataValues;
                            fund.proximity = geolib.getDistance(latlng, fund);
                            funds.push(results[i].dataValues);
                        }
                        // Sort the funds
                        funds.sort(function(a, b) {
                            return a.proximity - b.proximity;
                        });
                        // Return the funds
                        res.status(200).json(funds);
                    }
                })
                .catch(function(err) {
                    res.status(500).send();
                });
        }
    });

    app.get('/api/funds/:id', function(req, res) {
        var id              = parseInt(req.params.id),
            User            = req.models.User,
            Fund            = req.models.Fund,
            Claim           = req.models.Claim,
            Contribution    = req.models.Contribution,
            Vote            = req.models.Vote,
            returnObj       = {};

        if (!id) {
            return res.status(400).json({
                message: 'The "id" parameter must be a valid number'
            });
        }

        Fund.find(id).then(function(fund) {
            returnObj.fund = fund;
            // Get the claims next
            Contribution.findAll({
                where: {
                    fundId: id
                },
                include: [{
                    as: 'user',
                    model: User
                }]
            }).then(function(contributionsList) {
                var contributorMap = {};

                returnObj.contributions = util.db.sanitizeResultSet(contributionsList);
                returnObj.contributors = [];
                // Find contributors
                for (var i = 0; i < returnObj.contributions.length; i++) {
                    if (!contributorMap[returnObj.contributions[i].userId]) {
                        contributorMap[returnObj.contributions[i].userId] = true;
                        returnObj.contributors.push(returnObj.contributions[i].user);
                    }
                }
                // Next get the claims
                Claim.findAll({
                    where: {
                        fundId: id
                    }
                }).then(function(claimsList) {
                    // Exit quickly if we have no claims
                    if (claimsList.length < 1) {
                        returnObj.claims = {};
                        return res.status(200).json(returnObj);
                    }
                    // Otherwise, get the claim map going
                    var claimMap = {},
                        countQueryTotal = 0,
                        tryToFinish = function() {
                            countQueryTotal++;
                            if (countQueryTotal >= claimsList.length * 2) {
                                returnObj.claims = claimMap;
                                res.status(200).json(returnObj);
                            }
                        };
                    // Build the claim map
                    claimsList.forEach(function(claimListItem, i) {
                        claimMap[claimListItem.dataValues.id] = claimListItem.dataValues;
                        // Count the yeses
                        Vote.count({
                            where: {
                                claimId: claimListItem.dataValues.id,
                                yay: true
                            }
                        }).then(function(yesCount) {
                            claimMap[claimListItem.dataValues.id].yesCount = yesCount;
                            tryToFinish();
                        }).catch(function(err) {
                            claimMap[claimListItem.dataValues.id].yesCount = -1;
                            tryToFinish();
                        });
                        // Count the nos
                        Vote.count({
                            where: {
                                claimId: claimListItem.dataValues.id,
                                yay: false
                            }
                        }).then(function(noCount) {
                            claimMap[claimListItem.dataValues.id].noCount = noCount;
                            tryToFinish();
                        }).catch(function(err) {
                            claimMap[claimListItem.dataValues.id].noCount = -1;
                            tryToFinish();
                        });
                    });
                }).catch(function(err) {
                    log.error('/funds/:id failed:', err);

                    return res.status(500).json({
                        message: 'Could not fetch fund contributions'
                    });
                });
            }).catch(function(err) {
                log.error('/funds/:id failed:', err);

                return res.status(500).json({
                    message: 'Could not fetch fund contributions'
                });
            });
        }).error(function(err) {
            log.error('/funds/:id failed:', err);

            return res.status(500).json({
                message: 'Could not get fund details'
            });
        });
    });

    app.post('/api/claims/:id/vote/:verdict', function(req, res) {
        var claimId         = parseInt(req.params.id),
            verdict         = (req.params.verdict === 'yes') ? true : false,

            Vote            = req.models.Vote;

        if (!req.user) {
            //return res.status(401).send();
            req.user = {
                id: 1
            };
        }
        if (!claimId) {
            return res.status(400).json({
                message: 'The "claimId" parameter must be a valid number'
            });
        }

        Vote.create({
            userId: req.user.id,
            claimId: claimId,
            yay: verdict
        }).then(function(result) {
            return res.status(200).json(result);
        }).catch(function(err) {
            log.error('Could not create vote', err);
            return res.status(500).json({
                message: 'Could not create vote'
            });
        });
    });

    app.post('/api/funds/:id/contribute/:amount', function(req, res) {
        var fundId          = parseInt(req.params.id),
            amount          = parseFloat(req.params.amount),

            Contribution    = req.models.Contribution;

        if (!req.user) {
            //return res.status(401).send();
            req.user = {
                id: 1
            };
        }
        if (!fundId) {
            return res.status(400).json({
                message: 'The "fundId" parameter must be a valid number'
            });
        }
        if (!amount) {
            return res.status(400).json({
                message: 'The "amount" parameter must be a valid float'
            });
        }

        Contribution.create({
            userId: req.user.id,
            fundId: fundId,
            amount: amount,
            time: (new Date()).getTime()
        }).then(function(result) {
            return res.status(200).json(result);
        }).catch(function(err) {
            log.error('Could not create contribution', err);
            return res.status(500).json({
                message: 'Could not create contribution'
            });
        });
    });

    app.post('/api/funds/:id/claim', function(req, res) {
        var id              = parseInt(req.params.id),
            pictureUrls     = req.body.pictureUrls,
            description     = req.body.description,

            Fund            = req.models.Fund,
            Claim           = req.models.Claim;

        if (!req.user) {
            // return res.status(401).send();
            req.user = {
                id: 1
            };
        }
        if (!id) {
            return res.status(400).json({
                message: 'The "id" parameter must be a valid number'
            });
        }
        if (!pictureUrls || !pictureUrls.length) {
            return res.status(400).json({
                message: 'The "pictureUrls" parameter must be a valid array with at least one element'
            });
        }
        if (!description) {
            return res.status(400).json({
                message: 'The "description" parameter must be a valid string'
            });
        }

        Claim.create({
            pictureUrls: JSON.stringify(pictureUrls),
            description: description,
            fundId: id,
            userId: req.user.id
        }).then(function(result) {
            return res.status(200).json(result);
        }).catch(function(err) {
            return res.status(500).json({
                message: 'Could not create claim'
            });
        });
    });

    app.post('/api/funds', function(req, res) {
        if (/* !req.user */false) {
            res.status(401).send();
        } else {
            var title       = req.body.title,
                description = req.body.description,
                amount      = 0,
                deadline    = parseInt(req.body.deadline),
                address     = req.body.address,
                latitude    = parseFloat(req.body.latitude),
                longitude   = parseFloat(req.body.longitude),
                pictureUrl  = req.body.pictureUrl;

            if (!latitude || !longitude) {
                return res.status(400).json({
                    message: 'The "latitude" and "longitude" parameters are all required'
                });
            }
            if (!title) {
                return res.status(400).json({
                    message: 'The "title" parameter was invalid'
                });
            }
            if (!description) {
                return res.status(400).json({
                    message: 'The "description" parameter was invalid'
                });
            }
            if (!deadline) {
                return res.status(400).json({
                    message: 'The "deadline" parameter was invalid'
                });
            }
            if (!address) {
                return res.status(400).json({
                    message: 'The "address" parameter was invalid'
                });
            }
            if (!pictureUrl) {
                return res.status(400).json({
                    message: 'The "pictureUrl" parameter was invalid'
                });
            }

            req.models.Fund.create({
                title:          title,
                description:    description,
                amount:         amount,
                deadline:       deadline,
                address:        address,
                latitude:       latitude,
                longitude:      longitude,
                pictureUrl:     pictureUrl
            })
            .then(function(results) {
                res.status(200).json(results);
            })
            .catch(function() {
                res.status(500).send();
            });
        }
    });
};
