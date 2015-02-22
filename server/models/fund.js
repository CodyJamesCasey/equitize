var Sequelize = require('sequelize');

var MODEL_ID = 'Fund';

var model = undefined;
module.exports = {
    id: MODEL_ID,
    model: function(db) {
        if (!model) {
            model = db.define(MODEL_ID, {
                title:          Sequelize.STRING,
                description:    Sequelize.TEXT,
                amount:         Sequelize.DECIMAL,
                deadline:       Sequelize.BIGINT,
                address:        Sequelize.STRING,
                latitude:       Sequelize.DECIMAL,
                longitude:      Sequelize.DECIMAL,
                pictureUrl:     Sequelize.STRING
            });
        }
        return model;
    }
};
