// This File Contains User Sign Up Routes:
// Signup: POST /api/users
// Get All Requests: GET /api/users/id/requests

const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Request, User } = require('../../db/models');

const router = express.Router();

//vvv Validation middleware
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

// Signup: POST /api/users
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({user});
}));

// Get All Requests: GET /api/users/id/requests
router.get('/:id(\\d+)/requests', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const requests = await Request.findAll({ where: {userId} });
  return res.json(requests);
}));

//adding or changing user image: PUT /api/users/id
router.put('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { url } = req.body;
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);
  if ( url ) {
    const image = await Image.create({ url });
    await user.update({ imageId: image.id });
  }
    return res.json(user);
}));

module.exports = router;
