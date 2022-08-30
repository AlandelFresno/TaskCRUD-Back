const { validationResult } = require('express-validator');
const { default: jwtDecode } = require('jwt-decode');

const db = require('../models');
const {
  comparePassword,
  generateToken,
  encryptPassword,
} = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  // Validation error handler
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  // Verify if email already exists
  const databaseUser = await db.User.findOne({ where: { email } });
  if (!databaseUser) {
    // return if email don't exist
    return res.status(404).json({ msg: "User with that email doesn't exist" });
  }

  //compare encrypted password with the req password
  const comparationResult = await comparePassword(
    password,
    databaseUser.password
  );

  if (comparationResult === false) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const newToken = generateToken(databaseUser.dataValues);

  return res.status(200).json({
    msg: 'Logged successfully',
    user: databaseUser,
    token: newToken,
  });
};

const register = async (req, res) => {
  const { body } = req;

  // Validation error  handler
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  // Check if email is already used
  const userFound = await db.User.findOne({ where: { email: body.email } });
  if (userFound) {
    return res.status(400).json({ msg: 'User already exists with that email' });
  }
  // Password Encryption
  const password = await encryptPassword(body.password);
  // Initializing user
  const userData = {
    name: body.name,
    email: body.email,
    password: password,
  };

  try {
    const newUser = await db.User.create(userData);
    const token = generateToken(newUser);
    return res.json({ user: newUser, token });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const authMe = async (req, res) => {
  const token = req.token.split(' ')[1];
  const { UserInfo } = jwtDecode(token);
  const storedUser = await db.User.findByPk(UserInfo.id);
  res.status(200).json({ user: storedUser });
};

module.exports = { register, login, authMe };
