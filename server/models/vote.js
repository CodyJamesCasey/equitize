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
            VoteModel   = models[MODEL_ID];

        // A contribution has a fund foreign key
        VoteModel.belongsTo(FundModel, {
            as: 'fund'
        });
        // A contribution has a user foreign key
        VoteModel.belongsTo(UserModel, {
            as: 'user'
        });
        // A contribution has a claimer foreign key
        VoteModel.belongsTo(UserModel, {
            as: 'claimer'
        });
    }
};
