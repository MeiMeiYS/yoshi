const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('hello! this is test route "/"');
});

module.exports = router;
