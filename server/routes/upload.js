var log     = require('../log');

exports.route = function(app) {
    app.post('/api/upload', function(req, res) {
        console.log(req.files);
        if (!req.user) {
            res.status(401).send();
        } else if (!req.files || !req.files.length) {
            res.status(400).json({
                message: 'No files were detected'
            });
        } else {
            res.status(200).json({
                uploadCount: res.files.length
            });
        }
    });
};
