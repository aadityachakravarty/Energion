const mongoose = require('mongoose')
const schema = mongoose.Schema

const nodes = new schema({
    "location":{
      "lattitude":Number,
      "longitude":Number
    },
    "maxCapacity":Number,
    "currentCapacity":Number,
    "provider":String,
    "rate":Number
})

module.exports = mongoose.model('Nodes',nodes)
