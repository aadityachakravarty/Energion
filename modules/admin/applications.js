const applications = require(__base + 'models/consumer.js');

const getApplications = (req, res) => {
    let filter =
        req.query.filter == 'accepted' ? 1 :
            req.query.filter == 'rejected' ? -1 :
                req.query.filter == 'completed' ? 2 :
                    req.query.filter == 'pending' ? 0 : null;

    let filt = {};
    
    if (req.query.filter) {
        filt = { 'status': filter };
    }

    applications.find(filt, (err, data) => {
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
                msg: 'Applications',
                data: data
            });
        }
    });
}

module.exports = getApplications;