const userModel = require(__base + 'models/user.js');

const delUser = (req, res) => {
    if (req.info.id == req.body.id) {
        res.json({
            success: false,
            msg: 'You cannot delete your own account !'
        });
    }
    else {
        userModel.findOneAndDelete({ '_id': req.body.id }, (err, doc) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                res.json({
                    success: true,
                    msg: 'User Deleted.'
                });
            }
        });
    }
}

module.exports = delUser;