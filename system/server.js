const http = require('http');
const mongoose = require('mongoose');

// Global Variables
global.dev = process.env.NODE_ENV == 'development' ? true : false;

global.cfg = {
  sign: process.env.tokenSign,
  mongo: process.env.mongoURI,
  api: {
    google: process.env.googleAPIKey
  },
  email: {
    host: process.env.emailHost,
    user: process.env.emailUser,
    pass: process.env.emailPass
  }
}

const app = require('../app.js')
const config = require('./config.json');

const server = http.createServer(app)

const port = process.env.PORT || config.setup.port

/* Mongoose connection */
mongoose.connect(cfg.mongo, { useNewUrlParser: true }, (err) => {
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
