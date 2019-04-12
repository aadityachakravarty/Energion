const express = require('express');
const router = express.Router();

const auth = require(__base + 'modules/auth/protect.js');

// Admin check for the following URLS.
const lineman = (req, res, next) => {
    if (req.info.level == 2) {
        next();
    }
    else {
        res.status(401).json({
            success: false,
            msg: 'Unauthorized Request.'
        });
    }
}

router.get('/status', auth, lineman, (req, res) => {
    res.json({ success: true, "msg": 'You are a lineman.', "data": req.info });
});

router.get('/pending', auth, lineman, require(__base + 'modules/lineman/pending.js'));

router.post('/complete', auth, lineman, require(__base + 'modules/lineman/complete.js'));

module.exports = router;