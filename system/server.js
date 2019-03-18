const http = require('http')
const mongoose = require('mongoose')

global.dev = process.argv[2] == 'dev' ? true : false;

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
    if (dev)
      console.log('Database Connected.');
  }
});

// EnsureIndex Fallback.
mongoose.set('useCreateIndex', true);

/* Server Setup */
server.listen(port, () => {
  if (dev)
    console.log('Project active on : ' + port)
})

module.exports = server;
