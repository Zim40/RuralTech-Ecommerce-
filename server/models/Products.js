const { Schema, model } = require('mongoose');


const productsSchema = new Schema({
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
    required: true,
  },
});

const Products = model('Products', productsSchema);

module.exports = Products;