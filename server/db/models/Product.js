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
    // JOE_CR: Indeed.
    defaultValue: "This is a ticket.",
  },
  price: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 0.01,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // JOE_CR: What is this date column for? Could the included `createdAt` or `updatedAt` timestamps be used instead?
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // JOE_CR: I think using Sequelize.STRING will limit this column to 255 characters, which for URLs is sometimes not long enough.
  picture: {
    type: Sequelize.STRING,
    defaultValue:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5RtyQSyLevezMn3HZLZfZanXamupZvdhjWg&usqp=CAU",
  },
});

module.exports = Product;
