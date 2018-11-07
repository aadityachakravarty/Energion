const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const config = require(__base + 'system/config.json')

/* Page Routes */
router.get('/info', (req, res) => {
  res.json({
    success: true,
    version: '1.1.0',
    msg: "Energion API active."
  })
})

module.exports = router
