const Sequelize = require('sequelize');
const db = require("../db");

const Order = db.define("order", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true
    }
  },
  inCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  }

})

module.exports = Order;
