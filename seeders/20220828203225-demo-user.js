'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'demoUser',
      email: 'example@example.com',
      password: '$2b$08$gDD5g/yOVrjM1.CaX1VA1ODGmAkg7Fth6Df/CJXzaM6a9RoewYPFC', //123123
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
