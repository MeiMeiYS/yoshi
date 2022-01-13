const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Party, Request, Image, Videogame, User } = require('../../db/models');

const router = express.Router();

const requestValidators = [
    check('partyId')
        .exists({ checkFalsy: true })
        .withMessage('The party you tried to join does not exit.'),
    handleValidationErrors
];


//get all the requests by one user
router.get('^/:id(\\d+)/user', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const requests = await Request.findAll({where: {userId}})
    const parties = [];

    for (let i = 0; i < requests.length; i++){
        const party = await Party.findByPk(requests[i].partyId, { include: [
            {model: Videogame, include: {model: Image}},
            {model: User, include: {model: Image} },
              Image] });
        parties.push(party)
    }
    return res.json(parties);
}));

//post a request
router.post('^/:id(\\d+)/user', requireAuth, requestValidators, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { partyId } = req.body;
    await Request.create({ partyId, userId});
    const party = await Party.findByPk(partyId, { include: [
        {model: Videogame, include: {model: Image}},
        {model: User, include: {model: Image} },
          Image] });
    return res.json(party);
}))

//delete a request
router.delete('^/:id(\\d+)/user', requireAuth, requestValidators, asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { partyId } = req.body;
    await Request.destroy({where: {userId, partyId}})
    return res.json(partyId);;
}))

module.exports = router;
