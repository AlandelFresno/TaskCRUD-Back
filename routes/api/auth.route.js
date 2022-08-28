const express = require('express');
const { check } = require('express-validator');
const {
  login,
  register,
  authMe,
} = require('../../controllers/auth.controller');
const validateToken = require('../../middleware/validateToken');

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email recieved is not an email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 5 characters long').isLength({
      min: 5,
    }),
  ],
  login
);

router.post(
  '/register',
  [
    check('name', 'User name is required').not().isEmpty(),
    check('name', 'User name must be a string').isString(),
    check('email', 'Email is required').not().isEmpty(),
    check('email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6,
    }),
  ],
  register
);

router.get('/me', validateToken, authMe);

module.exports = router;
