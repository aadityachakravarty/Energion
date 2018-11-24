const consumer = require(__base + 'models/consumer.js');

const deleteCon = (req, res) => {
  if (!req.body.id) {
    res.json({
      success: false,
      msg: 'Please check the inputs.'
    });
  }
  else {
    consumer.findOneAndDelete({ '_id': req.body.id }, (err, doc) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        if (!doc) {
          res.json({
            success: false,
            msg: 'No record found.'
          });
        }
        else {
          res.json({
            success: true,
            msg: 'Record Deleted.'
          })
        }
      }
    });
  }
}

module.exports = deleteCon
