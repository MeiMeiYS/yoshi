const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Party, Request, Image, Videogame, User } = require('../../db/models');

const router = express.Router();

const newPartyValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your party.')
        .isLength({ max: 255, min: 3 })
        .withMessage('Party name must be between 3 and 255 characters long.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a short description for your party.'),
    check('space')
        .exists({ checkFalsy: true })
        .withMessage('Please provide party space.'),
    check('gameId')
        .exists({ checkFalsy: true })
        .withMessage('Please choose a video game.'),
    handleValidationErrors
];

const updatePartyValidators = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name for your party.')
        .isLength({ max: 255, min: 3 })
        .withMessage('Party name must be between 3 and 255 characters long.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a short description for your party.'),
    check('space')
        .exists({ checkFalsy: true })
        .withMessage('Please provide party space.'),
    handleValidationErrors
];


//get 12 parties max
router.get('/', asyncHandler(async (req, res) => {
    // const parties = await Party.get12Parties({limit: 12});
    const parties = await Party.findAll({ include: [
      {model: Videogame, include: {model: Image}},
      {model: User, include: {model: Image} },
        Image],
        limit: 12,
        order: [
            [`updatedAt`, 'DESC']
        ] });
    return res.json({parties});
}));

router.post('/', requireAuth, newPartyValidators, asyncHandler(async (req, res) => {
    const { name, description, space, openStatus, gameId, ownerId, url } = req.body;
    const data = { name, description, space, openStatus, gameId, ownerId };

    //If there is an image in req.body, create a image
    let image;
    if (url) {
        image = await Image.create({url});
        data['imageId'] = image.id
    }
    // create party
    const party = await Party.create(data);
    return res.json(party);

}));

router.get('^/:id(\\d+)', asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const party = await Party.findByPk(partyId,{ include: [
        {model: Videogame, include: {model: Image}},
        {model: User, include: {model: Image} },
          Image] });
    return res.json({party});
}));

//check if this party name is used, party name can not start with number
router.get('^/:partyName', requireAuth, asyncHandler(async (req, res) => {
    const partyName = req.params.partyName;
    const party = await Party.findOne({ where: {name:partyName}});
    if (party) return res.json(party);
    else return res.json('ok');
}));

router.put('^/:id(\\d+)', requireAuth, updatePartyValidators, asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const { name, description, space, url } = req.body;
    const data = { name, description, space };
    const party = await Party.findByPk(partyId);

    let image;
    //if there is an image, and there was no image before: create one
    //if there is an image, and there was an image before: update it
    //if there is no image, and there was an image before: update party first then delete image
    //else, update party
    if (req.body.url && !party.imageId) {
        image = await Image.create({url});
        data['imageId'] = image.id;
        await party.update(data);
    } else if (req.body.url && party.imageId) {
        image = await Image.findByPk(party.imageId);
        await image.update({url: req.body.url});
        await party.update(data);
    } else if (!req.body.url && party.imageId) {
        const imageId = party.imageId;
        data['imageId'] = null;
        await party.update(data);
        image = await Image.findByPk(imageId);
        image.destroy();
    } else {
        await party.update(data);
    }

    return res.json('success');
}));

router.delete('^/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const party = await Party.findByPk(partyId);
    // if there is image, delete the image
    if (party.imageid) {
        const image = await Image.findByPk(party.imageId);
        image.destroy();
    }
    //delete the party
    party.destroy();
    return res.json('success');
}));

// router.get('/:id(\\d+)/requests', asyncHandler(async (req, res) => {
//     const partyId = parseInt(req.params.id, 10);
//     const requests = await Request.findAll({ where: {partyId} });
//     return res.json(requests);
// }));

module.exports = router;
