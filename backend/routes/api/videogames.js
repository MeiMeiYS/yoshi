const express = require('express');
const asyncHandler = require('express-async-handler');

const { Videogame } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const games = await Videogame.getAllVideogames();
    return res.json({games});
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const game = await Videogame.getVideogameById(gameId);
    return res.json({game});
}));

module.exports = router;
