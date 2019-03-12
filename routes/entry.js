const express = require('express')
const router = express.Router()

/* Page Routes */
router.post('/node', require(__base + 'modules/entry/enterNodes.js'))

router.get('/getNodes', require(__base + 'modules/entry/getNodes.js'))

module.exports = router
