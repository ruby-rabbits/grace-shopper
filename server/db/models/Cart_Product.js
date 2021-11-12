const Sequelize = require("sequelize");
const db = require("../db");

const Cart_Product = db.define('cart_product', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 1
    }
  },
  amountPaid: {
    type: Sequelize.DECIMAL(12,2),
    defaultValue: null,
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  purchaseDate: {
    type: Sequelize.DATE,
    defaultValue: null,
    validate: {
      isDate: true
    }
  }
});

module.exports = Cart_Product
