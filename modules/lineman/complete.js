const ObjectId = require('mongoose').Types.ObjectId;
const applications = require(__base + 'models/consumer.js');

const completeApp = (req, res) => {
    if (ObjectId.isValid(req.body.id)) {
        applications.findOneAndUpdate({ '_id': req.body.id }, {
            $set: {
                'status': 2,
                'tracking.lineman.completed': true
            }
        }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: 'Something has gone wrong. ',
                    technical: err.message
                });
            }
            else {
                res.json({
                    success: true,
                    msg: 'Application installation completed.'
                });
            }
        });
    }
    else {
        res.status(400).json({
            success: false,
            msg: 'Invalid Request.'
        });
    }
}

module.exports = completeApp;