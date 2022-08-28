'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        desciption: 'description of task 1',
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 2',
        desciption: 'description of task 2',
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 3',
        desciption: 'description of task 3',
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 4',
        desciption: '',
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task swim',
        desciption: '',
        owner: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Task 1',
        desciption: "I'm the first task of the owner 3",
        owner: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
