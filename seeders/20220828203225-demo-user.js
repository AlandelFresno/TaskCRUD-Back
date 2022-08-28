'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'demoUser',
      email: 'example@example.com',
      password: '$2b$08$.tQ1Z.0s1RnWPq/LrvAIP.gzRmjYPi7.922KNMRZK1ZD1YGvG3B/K',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
