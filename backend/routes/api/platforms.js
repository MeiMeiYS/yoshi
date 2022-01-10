const express = require('express');
const asyncHandler = require('express-async-handler');

const { Platform } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const platforms = await Platform.getAllPlatforms();
    return res.json({platforms});
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const platformId = parseInt(req.params.id, 10);
    const platform = await Platform.getPlatformById(platformId);
    return res.json({platform});
}));

module.exports = router;
