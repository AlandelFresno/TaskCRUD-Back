const express = require('express');
const { check } = require('express-validator');
const {
  getTasks,
  postTask,
  updateTask,
  deleteTask,
} = require('../../controllers/task.controller');
const validateToken = require('../../middleware/validateToken');

const router = express.Router();

router.get('/', validateToken, getTasks);
router.post(
  '/',
  [
    check('title', 'Title is Required').not().isEmpty(),
    check('title', 'Title must be a string').isString(),
  ],
  validateToken,
  postTask
);
router.put('/:id', validateToken, updateTask);
router.delete('/:id', validateToken, deleteTask);

module.exports = router;
