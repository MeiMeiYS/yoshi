const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Party, Request, Image } = require('../../db/models');

const router = express.Router();

//get 20 parties max
router.get('/', asyncHandler(async (req, res) => {
    const parties = await Party.get12Parties({limit: 12});
    return res.json({parties});
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    // console.log ('You are here!!!!!!!!!!!!!!!!!!!!!')
    // console.log (req.body)
    const { name, description, space, openStatus, gameId, ownerId, url } = req.body;
    const data = { name, description, space, openStatus, gameId, ownerId };

    //If there is an image in req.body, create a image
    let image;
    if (url) {
        console.log('created image')
        image = await Image.create(url);
        data['imageId'] = image.id
    }

    //create party
    const party = await Party.create(data);
    console.log('new Party:', party);

    return party;
}));

//check if this party name is used
router.get('/:partyName', requireAuth, asyncHandler(async (req, res) => {
    const partyName = req.params.partyName;
    const party = await Party.findOne({ where: {name:partyName}});
    if (party) return res.json(false);
    else return res.json(true);
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
