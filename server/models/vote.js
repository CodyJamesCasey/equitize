var Sequelize = require('sequelize');

var MODEL_ID = 'Vote';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                yay:    Sequelize.BOOLEAN
            });
        }
        return model;
    },
    relate: function(models) {
        var FundModel   = models.Fund,
            UserModel   = models.User,
            ClaimModel  = models.Claim,
            VoteModel   = models[MODEL_ID];

        // A vote has a user foreign key
        VoteModel.belongsTo(UserModel, {
            as: 'user'
        });
        // A vote has a claim foreign key
        VoteModel.belongsTo(ClaimModel, {
            as: 'claim'
        });
    }
};
