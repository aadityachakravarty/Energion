const consumer = require(__base + 'models/consumer.js');

const applications = (req, res) => {
  consumer.find({}, (err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      let names = data.map((e) => e.consumerDetails.applicantName);
      res.json({
        success: true,
        upcoming: names
      });
    }
  });
}

module.exports = applications
