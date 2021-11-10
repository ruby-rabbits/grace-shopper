//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Category = require("./models/Category")

// one-to-many associations for categories & products (one category belongs to many products...)
Product.belongsTo(Category)
Category.hasMany(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Category
  },
};
