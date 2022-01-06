const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// vvv test route
router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('hello! this is test route "/"');
});

module.exports = router;
