const mongoose = require('mongoose')
const nodeModel = require(__base + 'models/nodes.js')

const createBackupNode = (node) => {
  let newNode = new nodeModel({
    "location":{
      "lattitude":node.lat,
      "longitude":node.lon
    },
    "maxCapacity":node.mc,
    "currentCapacity":node.cc,
    "provider":node.provider,
    "rate":node.rate
  })
  newNode.save((err,data) => {
    if(err) {
      res.status(500).json({
        "error":err
      })
    }
    else {
      res.json({"message":"Dummy node saved successfully."})
    }
  })
}

module.exports = createBackupNode
