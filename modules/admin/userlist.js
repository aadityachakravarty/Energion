const users = require(__base + 'models/user.js');

const userlist = (req, res) => {
    users.find({'status': 1}, (err, doc) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: 'Something has gone wrong. ',
                technical: err.message
            });
        }
        else {
            let data = doc.map((l) => {
                return { 'fullname': l.fullname, 'email': l.email, 'phone': l.phone, 'id': l._id, 'level': l.level };
            });

            res.json({
                success: true,
                msg: 'User List',
                data: data
            });
        }
    });
}

module.exports = userlist;