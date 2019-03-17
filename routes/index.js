const express = require('express');
const router = express.Router();

/* Active Page Routes */
router.use('/', require('./basic.js'));
router.use('/auth', require('./auth.js'));
router.post('/estimate', require(__base + 'modules/estimate/trans.js'));
router.use('/connection', require('./consumer.js'));
router.use('/admin', require('./admin.js'));
router.use('/lineman', require('./lineman.js'));

/* Data Entry */
router.use('/entry', require('./entry.js'))

module.exports = router;