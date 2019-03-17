const linemanList = require(__base + 'models/user.js');

const getLineman = (req, res) => {
    linemanList.find({ 'level': 2 }, (err, doc) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: 'Something has gone wrong. ',
                technical: err.message
            });
        }
        else {
            let data = doc.map((l) => {
                return { 'fullname': l.fullname, 'email': l.email, 'phone': l.phone };
            });

            res.json({
                success: true,
                msg: 'Available Linemen',
                data: data
            });
        }
    });
}

module.exports = getLineman;