const { Schema, model } = require('mongoose');

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
  }
});

const Category = model('Category', categorySchema);

module.exports = Category;