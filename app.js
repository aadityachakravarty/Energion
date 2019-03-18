const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

/* Global Path setup for easy require */
global.__base = __dirname + '/';

const config = require(__base + 'system/config.json')

/* Express Instance */
const app = express()

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

if (dev) {
  app.use(morgan('dev'));
}

app.set('superSecret', config.setup.sign);

/* Global Cross-Origin Access */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next()
})

/* API Routes */
app.use('/api', require(__base + 'routes/index.js'));

/* Angular Application Root */
app.use('/', express.static(__dirname + '/dist'));
app.use('/uploads', express.static(__dirname + "/uploads"));
app.use((req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

module.exports = app
