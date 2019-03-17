const ObjectId = require('mongoose').Types.ObjectId;
const application = require(__base + 'models/consumer.js');

const approveReq = (req, res) => {
    if (req.body.id && req.body.lineman) {
        if (ObjectId.isValid(req.body.id) && ObjectId.isValid(req.body.lineman)) {
            application.findOneAndUpdate({ '_id': req.body.id }, {
                "status": 1,
                "tracking": {
                    "lineman": {
                        "allotted": true,
                        "id": req.body.lineman,
                        "status": 1
                    },
                    "verification": {
                        "user": true,
                        "finance": true,
                        "availability": true
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
                        msg: 'Application accepted successfully and awaiting completion.'
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

module.exports = approveReq;