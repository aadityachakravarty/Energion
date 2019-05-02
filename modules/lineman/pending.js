const applications = require(__base + 'models/consumer.js');

const pendingApps = (req, res) => {
    applications.find({ 'status': 1, 'tracking.lineman.id': req.info.id }, (err, doc) => {
        if (err) {
            res.status(500).json({
                success: false,
                msg: 'Something has gone wrong. ',
                technical: err.message
            });
        }
        else {
            let results = doc.map((i) => i.consumerDetails);
            res.json({
                success: true,
                msg: 'Pending requests.',
                data: results,
                count: results.length
            });
        }
    });
}

module.exports = pendingApps;