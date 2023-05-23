const db = require('../config/connection');
const { 
  User,
  Category,
  Order,
  Products } = require('../models');

const userSeeds = require('./userSeeds.json');
const categorySeeds = require('./categorySeeds.json');
const productSeeds = require('./productSeeds.json');

db.once('open', async () => {
  try {
    // await User.deleteMany({}); --- DO NOT UNCOMMENT!

    // await User.create(userSeeds); --- DO NOT UNCOMMENT!

    // await Category.deleteMany({}); --- DO NOT UNCOMMENT!

    // await Category.create(categorySeeds); --- DO NOT UNCOMMENT! 

    await Products.deleteMany({});

    await Products.create(productSeeds);



  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
