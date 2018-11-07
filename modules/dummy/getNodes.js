const mongoose = require('mongoose')
const node = require(__base + 'models/nodes.js')

const page = (req,res) => {
    node.find({}, (err,data) => {
      if(err) {
        res.json({"Error":err})
      }
      else {
        res.json(data)
      }
    })
}

module.exports = page
