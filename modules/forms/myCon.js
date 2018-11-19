const Consumer = require(__base + 'models/consumer.js');

const myCon = (req, res) => {
  Consumer.find({ "submitted": req.info.id }, (err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      res.json({
        success: true,
        data: data
      });
    }
  });
}

module.exports = myCon
