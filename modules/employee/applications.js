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
      let dataFilter = data.map((e) => ({
        name: e.consumerDetails.applicantName,
        address: e.consumerDetails.connectionAddress
      }));
      res.json({
        success: true,
        upcoming: dataFilter
      });
    }
  });
}

module.exports = applications
