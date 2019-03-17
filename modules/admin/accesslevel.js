const ObjectId = require('mongoose').Types.ObjectId;
const users = require(__base + 'models/user.js');

const accessLevel = (req, res) => {
    if (req.body.id && req.body.level) {
        if (req.info.id == req.body.id) {
            res.status(400).json({
                success: false,
                msg: 'You cannot modify your own access level.'
            });
        }
        else {
            let allowed = [1, 2, 5];
            if (allowed.includes(parseInt(req.body.level))) {
                if (ObjectId.isValid(req.body.id)) {
                    users.findOneAndUpdate({ '_id': req.body.id }, { 'level': req.body.level }, (err, doc) => {
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
                                msg: 'Access level changed successfully.'
                            });
                        }
                    });
                }
            }
            else {
                res.status(400).json({
                    success: false,
                    msg: 'Access level invalid.'
                });
            }
        }
    }
}

module.exports = accessLevel;