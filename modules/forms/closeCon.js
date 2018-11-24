const consumer = require(__base + 'models/consumer.js');

const transferCon = (req, res) => {
  if (!req.body.id || !req.body.reason) {
    res.json({
      success: false,
      msg: 'Please check the inputs.'
    });
  }
  else {
    consumer.findOneAndUpdate({ '_id': req.body.id }, {
      $set: {
        'closureOfConnection': {
          'reasonOfClosure': req.body.reason,
          'isClosureApproved': false
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

module.exports = transferCon
