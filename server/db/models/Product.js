const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  productName: {
    type: Sequelize.STRING(250),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "This is a ticket.",
  },
  category: {
    type: Sequelize.ENUM(
      "movies",
      "concerts",
      "theatre shows",
      "sporting events",
      "miscellaneous"
    ),
    defaultValue: "miscellaneous",
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 0.01,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5RtyQSyLevezMn3HZLZfZanXamupZvdhjWg&usqp=CAU",
  },
});

module.exports = Product;
