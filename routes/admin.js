const express = require('express');
const router = express.Router();

const auth = require(__base + 'modules/auth/protect.js');

// Admin check for the following URLS.
const admin = (req, res, next) => {
    if (req.info.admin) {
        next();
    }
    else {
        res.json({
            success: false,
            msg: 'Access level not sufficient.'
        });
    }
}

router.get('/status', auth, admin, (req, res) => {
    res.json({ success: true, "msg": 'You are an admin.', "data": req.info });
});

module.exports = router;
