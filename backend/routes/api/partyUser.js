const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Party, Request, Image, Videogame, User, PartyUser } = require('../../db/models');

const router = express.Router();


//accept a user to join party, delete all requests
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { partyId, userId } = req.body;
    await Request.destroy({where: { partyId, userId }});
    await PartyUser.create({ partyId, userId });
    const user = await User.findByPk(userId, { include: Image });
    return res.json(user);
}));

//send all party members
router.get('^/:id(\\d+)', asyncHandler(async (req, res) => {
    const partyId = parseInt(req.params.id, 10);
    const partyUsers = await PartyUser.findAll({where: {partyId}})
    const users = [];
    for (let i = 0; i < partyUsers.length; i++){
        const user = await User.findByPk(partyUsers[i].userId, { include: Image });
        users.push(user)
    }
    return res.json(users);
}));

//send all parties that this current member joined
router.get('^/:id(\\d+)/user', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const partyUsers = await PartyUser.findAll({where: {userId}})
    const parties = [];
    for (let i = 0; i < partyUsers.length; i++){
        const party = await Party.findByPk(partyUsers[i].partyId, { include: [
            {model: Videogame, include: {model: Image}},
            {model: User, include: {model: Image} },
              Image] });
        parties.push(party)
    }
    return res.json(parties);
}));

//delete member from party
router.delete('/', requireAuth, asyncHandler(async (req, res) => {
    const { partyId, userId } = req.body;
    await PartyUser.destroy({where: {userId, partyId}})
    return res.json('success')
}))

module.exports = router;
