//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
// const Order = require("./models/Order");
const Category = require("./models/Category")
const Cart = require('./models/Cart')
const Cart_Product = require('./models/Cart_Product')

// one-to-many associations for categories & products (one category belongs to many products...)
Product.belongsTo(Category)
Category.hasMany(Product)

// one-to-one for users and carts
Cart.hasOne(User); //User model will have cartId
User.belongsTo(Cart);

module.exports = {
  db,
  models: {
    User,
    Product,
    // Order,
    Category,
    Cart,
    Cart_Product
  },
};
