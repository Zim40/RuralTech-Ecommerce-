const { Schema, model } = require('mongoose');




const productSchema = new Schema({
  // product fields
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 280,
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  image: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    index: true,
  },
  quantity: {
    type: Number,
    
  },
});

// For every product added to a Category this performs calculation on how many products in the specific category.
productSchema.post('save', async function () {
  try {
    const Category = model('Category');
    
    const category = await Category.findById(this.category);
    console.log(category, "product");
    if (category) {
      await category.calculateTotalQuantity();
    }
    
    
  } catch (error) {
    console.error(error);
  }
});


const Products = model('Products', productSchema);

module.exports = Products;

// 646af716a8b1e66b88fa8923 gpu cat
// 