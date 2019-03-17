const ObjectId = require('mongoose').Types.ObjectId;
const application = require(__base + 'models/consumer.js');

const rejectReq = (req, res) => {
    if (req.body.id && req.body.reason && req.body.type) {
        if (ObjectId.isValid(req.body.id)) {
            application.findOneAndUpdate({ '_id': req.body.id }, {
                "status": -1,
                "tracking": {
                    "lineman": {
                        "allotted": false,
                        "status": -1
                    },
                    "verification": {
                        "user": req.body.type == 'user' ? false : null,
                        "finance": req.body.type == 'finance' ? false : null,
                        "availability": req.body.type == 'availability' ? false : null,
                        "ifCancelReason": req.body.reason
                    }
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
                        msg: 'Application rejected successfully.'
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
    else {
        res.status(400).json({
            success: false,
            msg: 'Invalid Request'
        });
    }
}

module.exports = rejectReq;