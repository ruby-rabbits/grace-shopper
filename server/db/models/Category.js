const Sequelize = require("sequelize");
const db = require("../db");


const Category = db.define("category", {
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
    