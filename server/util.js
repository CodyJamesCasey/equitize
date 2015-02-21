module.exports = {
    env: {
        loggingIsVerbose: process.env.VERBOSE && process.env.VERBOSE !== 'false',
        serverPort: parseInt(process.env.PORT) || 80,
        sessionSecret: process.env.SESSION_SECRET || 'NO_SESSION_SECRET',
        venmoClientId: process.env.VENMO_CLIENT_ID || 'NO_VENMO_CLIENT_ID',
        venmoClientSecret: process.env.VENMO_CLIENT_SECRET || 'NO_VENMO_CLIENT_SECRET',
        dbConnString: process.env.DB || 'postgres://groupdirectdev:groupdirectdev@localhost:5432/jiranidev'
    }
};
