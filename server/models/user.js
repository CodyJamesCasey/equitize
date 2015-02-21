var Sequelize = require('sequelize');

var MODEL_ID = 'User';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                venmoId:        Sequelize.STRING,
                name:           Sequelize.STRING,
                pictureUrl:     Sequelize.STRING,
                email: {
                    type:       Sequelize.STRING,
                    validate:   {
                        isEmail: true
                    }
                }
            });
        }
        return model;
    }
};
