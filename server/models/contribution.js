var Sequelize = require('sequelize');

var MODEL_ID = 'Contribution';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                amount:     Sequelize.DECIMAL,
                time:       Sequelize.BIGINT
            });
        }
        return model;
    },
    relate: function(models) {
        var FundModel           = models.Fund,
            UserModel           = models.User,
            ContributionModel   = models[MODEL_ID];

        // A contribution has a fund foreign key
        ContributionModel.belongsTo(FundModel, {
            as: 'fund'
        });
        // A contribution has a user foreign key
        ContributionModel.belongsTo(UserModel, {
            as: 'user'
        });
    }
};
