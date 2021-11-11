'use strict';

const {
  db,
  models: { User, Product, Category },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ]);

  const categories = await Promise.all([
    Category.create({ categoryDisplayName: 'Movies', categoryURLName: 'movies'}),
    Category.create({ categoryDisplayName: 'Concerts', categoryURLName: 'concerts'}),
    Category.create({ categoryDisplayName: 'Theatre Shows', categoryURLName: 'theatre'}),
    Category.create({ categoryDisplayName: 'Sporting Events', categoryURLName: 'sports'}),
    Category.create({ categoryDisplayName: 'Miscellaneous', categoryURLName: 'misc'})
  ]);

  const products = await Promise.all([
    Product.create({ productName: 'Codewars', price: 20.0, categoryId: 5 }),
    Product.create({ productName: 'Dune', price: 15.0, categoryId: 1}),
  ]);



  // const orders = await Promise.all([
  //   Order.create({
  //     userId: users[0].id,
  //     productId: products[0].id,
  //     quantity: 2,
  //   }),
  //   Order.create({
  //     userId: users[0].id,
  //     productId: products[1].id,
  //     quantity: 1,
  //   }),
  //   Order.create({
  //     userId: users[1].id,
  //     productId: products[1].id,
  //     quantity: 3,
  //   }),
  // ]);

  console.log(
    `seeded ${users.length} users, ${products.length} products, ${categories.length} categories`
  );
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products: {
      codewars: products[0],
      dune: products[1],
    },
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
