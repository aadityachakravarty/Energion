const http = require('http')
const mongoose = require('mongoose')

const app = require('../app.js')
const config = require('./config.json')

const server = http.createServer(app)

const port = process.env.PORT || config.setup.port

/* Mongoose connection */
mongoose.connect(config.setup.database, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err.message);
  }
  else {
    console.log('Database Connected.');
  }
})

/* Server Setup */
server.listen(port, () => {
  console.log('Project active on : '+port)
})

module.exports = server;
