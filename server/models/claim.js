var Sequelize = require('sequelize');

var MODEL_ID = 'Claim';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                pictureUrls:       Sequelize.STRING,
                description:       Sequelize.STRING
            });
        }
        return model;
    },
    relate: function(models) {
        var FundModel   = models.Fund,
            UserModel   = models.User,
            ClaimModel  = models[MODEL_ID];

        // A contribution has a fund foreign key
        ClaimModel.belongsTo(FundModel, {
            as: 'fund'
        });
        // A contribution has a user foreign key
        ClaimModel.belongsTo(UserModel, {
            as: 'user'
        });
    }
};
