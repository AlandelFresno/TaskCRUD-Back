'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'description of task 1',
        owner: 1,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        description: 'description of task 2',
        owner: 1,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 3',
        description: 'description of task 3',
        owner: 1,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 4',
        description: '',
        owner: 1,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task swim',
        description: '',
        owner: 2,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 1',
        description: "I'm the first task of the owner 3",
        owner: 3,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  },
};
