const express = require('express')
const router = express.Router()

const config = require(__base + 'system/config.json')

/* Page Routes */
router.get('/exec', require(__base + 'modules/load/balancer.js'))

module.exports = router
