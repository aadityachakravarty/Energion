const mongoose = require('mongoose');
const schema = mongoose.Schema

var notification = new schema({
  "sender": String,
  "receiver": String,
  "action": String,
  "seen": Boolean
})

module.exports = mongoose.model('Notification',notification)
