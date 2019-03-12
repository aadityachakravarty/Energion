const consumer = require(__base + 'models/consumer.js');

const transferCon = (req, res) => {
  if (!req.body.email || !req.body.id) {
    res.json({
      success: false,
      msg: 'Please check the inputs.'
    });
  }
  else {
    consumer.findOne({ 'consumerDetails.emailAddress': req.body.email }, (err, user) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        if (!user) {
          res.json({
            success: false,
            msg: 'No recipient found.'
          })
        }
        else {
          consumer.findOneAndUpdate({ '_id': req.body.id }, {
            $set: {
              'transferApplication': {
                'transferringToName': user.consumerDetails.applicantName,
                'newOwnerAadharNumber': user.consumerDetails.aadharNumber,
                'address': req.body.address || user.consumerDetails.permanentAddress,
                'isTransferCompleted': false
              }
            },
          }, (err) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              res.json({
                success: true,
                msg: 'Request Submitted.'
              });
            }
          });
        }
      }
    });
  }
}

module.exports = transferCon
