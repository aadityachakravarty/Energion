const express = require('express');
const router = express.Router();

/* Active Page Routes */
router.use('/', require('./basic.js'));
router.use('/auth', require('./auth.js'));
router.use('/estimate', require('./estimate.js'));
router.use('/connection', require('./consumer.js'));
router.use('/admin', require('./admin.js'));
router.use('/lineman', require('./lineman.js'));

module.exports = router;