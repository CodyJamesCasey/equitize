module.exports = {
    env: {
        loggingIsVerbose: process.env.VERBOSE && process.env.VERBOSE !== 'false',
        serverPort: parseInt(process.env.PORT) || 80,
        sessionSecret: process.env.SESSION_SECRET || 'NO_SESSION_SECRET',
        venmoClientId: process.env.VENMO_CLIENT_ID || 'NO_VENMO_CLIENT_ID',
        venmoClientSecret: process.env.VENMO_CLIENT_SECRET || 'NO_VENMO_CLIENT_SECRET',
        venmoCallbackUrl: process.env.VENMO_CALLBACK_URL || 'NO_VENMO_CALLBACK_URL',
        dbConnString: process.env.DB || 'postgres://groupdirectdev:groupdirectdev@localhost:5432/jiranidev'
    },
    db: {
        sanitizeResultSet: function(resultSet) {
            return resultSet.map(function(result) {
                return result.dataValues;
            });
        }
    }
};
