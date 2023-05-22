const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');


const categorySchema = new Schema({
  // category fields
  categoryName: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 280,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0
  },
});


// Method to calculate product quantity in each individual Category.
categorySchema.methods.calculateTotalQuantity = async function () {
  console.log(this._id)
  try {
    
    const totalQuantity = await model('Products').aggregate([
     
      { $match: { category: this._id} },
      { $group: { _id: '$category', total: { $sum: '$quantity' } } },
     
      
    ]);
    
    this.quantity = totalQuantity[0]?.total || 0;
    await this.save();
  } catch (error) {
    throw new Error('Failed to calculate total quantity');
  }
};

const Category = model('Category', categorySchema);

module.exports = Category;