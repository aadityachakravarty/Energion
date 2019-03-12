const nodeModel = require(__base + 'models/nodes.js');

const inputNodes = (req,res) => {
  let newNode = new nodeModel({
    "location":{
      "lattitude":req.body.lat,
      "longitude":req.body.lon
    },
    "maxCapacity":req.body.mc,
    "currentCapacity":req.body.cc,
    "provider":req.body.provider,
    "rate":req.body.rate
  })
  newNode.save((err,data) => {
    if(err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      res.json({
        success: true,
        msg: "Dummy node saved successfully."
      });
    }
  })
}

module.exports = inputNodes
