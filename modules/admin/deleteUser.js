const userModel = require(__base + 'models/user.js');

const delUser = (req, res) => {
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

module.exports = delUser;