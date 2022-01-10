const express = require('express');
const asyncHandler = require('express-async-handler');

const { Genre } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.getAllGenres();
    return res.json({genres});
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const genreId = parseInt(req.params.id, 10);
    const genre = await Genre.getGenreById(genreId);
    return res.json({genre});
}));

module.exports = router;
