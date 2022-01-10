const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image } = require('../../db/models');

const router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const imageId = parseInt(req.params.id, 10);
    const image = await Image.getImageById(imageId);
    return res.json({image});
}));

module.exports = router;
