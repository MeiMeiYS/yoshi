const express = require('express');
const asyncHandler = require('express-async-handler');

const { Party, Request } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const parties = await Party.getAllParties();
    return res.json({parties});
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const party = await Party.getPartyById(partyId);
    return res.json({party});
}));

router.get('/:id(\\d+)/requests', asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const requests = await Request.findAll({ where: {partyId} });
    return res.json(requests);
}));


module.exports = router;
