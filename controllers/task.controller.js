const { validationResult } = require('express-validator');
const { Task } = require('../models');
const { getUserByToken } = require('../services/task.service');

const getTasks = async (req, res) => {
  const { UserInfo } = await getUserByToken(req.token);

  try {
    const task = await Task.findAll({
      attributes: ['id', 'title', 'description', 'owner', 'createdAt'],
      where: {
        owner: UserInfo.id,
      },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ msg: 'An error ocurred', error });
  }
};

const postTask = async (req, res) => {
  const { UserInfo } = await getUserByToken(req.token);
  const task = {
    title: req.body.title,
    description: req.body.description,
    owner: UserInfo.id,
  };
  try {
    const newTask = await Task.create(task);
    res.status(200).json({ msg: 'Task created', task: newTask });
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error', error });
  }
};

const updateTask = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ err: err.array() });
  }
  const { body, params } = req;
  const oldTask = await Task.findOne({
    attributes: ['id', 'title', 'description', 'owner', 'createdAt'],
    where: {
      id: params.id,
    },
  });

  const { UserInfo } = await getUserByToken(req.token);
  if (UserInfo.id === oldTask.owner) {
    const task = {
      ...oldTask.dataValues,
      title: body.title || oldTask.title,
      description: body.description || oldTask.description,
      updatedAt: new Date(),
    };
    console.log(task);
    try {
      await Task.update(task, { where: { id: params.id } });
      res.status(200).json({ msg: 'Task updated', task: task });
    } catch (error) {
      res.status(500).json({ msg: 'An error ocurred', error });
    }
  } else {
    res.status(403).json({ msg: "You cannot edit other people's tasks" });
  }
};

const deleteTask = async (req, res) => {
  const { params } = req;
  const oldTask = await Task.findOne({
    attributes: ['id', 'title', 'description', 'owner', 'createdAt'],
    where: {
      id: params.id,
    },
  });
  const { UserInfo } = await getUserByToken(req.token);
  console.log(UserInfo)
  console.log(oldTask.owner)
  console.log(UserInfo.id === oldTask.owner)

  if (UserInfo.id === oldTask.owner) {
    try {
      await Task.destroy({ where: { id: params.id } });
      res
        .status(200)
        .json({ msg: 'Task deleted succesfully', taskDeleted: oldTask });
    } catch (error) {
      res.status(500).json({ msg: 'An error ocurred', error });
    }
  } else {
    res.status(403).json({ msg: "Cannot delete other people's tasks" });
  }
};

module.exports = { getTasks, postTask, updateTask, deleteTask };
