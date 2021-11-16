const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  // JOE_CR: You don't have to include your entity name in the column name -- it's redundant. I think this column
  // name should just be `displayName`. Imagine later on when you have a row from this table: `category.categoryDisplayName`.
  categoryDisplayName: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  categoryURLName: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Category;
