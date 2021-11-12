'use strict';

const {
  db,
  models: { User, Product, Category, Cart_Product},
} = require('../server/db');
const fs = require('fs');
const userData = JSON.parse(fs.readFileSync('mock-data/users.json', 'utf8'))
const productData = JSON.parse(fs.readFileSync('mock-data/products.json', 'utf8'))
const cartProductData = JSON.parse(fs.readFileSync('mock-data/cart_product.json', 'utf8'))

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', isAdmin: true }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  const mockUsers = await Promise.all(userData.map(user => User.create(user)))

  const categories = await Promise.all([
    Category.create({ categoryDisplayName: 'Movies', categoryURLName: 'movies'}),
    Category.create({ categoryDisplayName: 'Concerts', categoryURLName: 'concerts'}),
    Category.create({ categoryDisplayName: 'Theatre Shows', categoryURLName: 'theatre'}),
    Category.create({ categoryDisplayName: 'Sporting Events', categoryURLName: 'sports'}),
    Category.create({ categoryDisplayName: 'Miscellaneous', categoryURLName: 'misc'})
  ]);

  // Creating products
  const products = await Promise.all(productData.map(product => Product.create(product)));

  // Creating rows in Cart_Products
  const cart_products = await Promise.all(cartProductData.map(cp => Cart_Product.create(cp)));


  console.log(
    `seeded ${users.length + mockUsers.length} users, ${categories.length} categories, ${products.length} products, ${cart_products.length} rows in Cart_Product`
  );

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    // products: {
    //   codewars: products[0],
    //   dune: products[1],
    // },
    // orders
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
