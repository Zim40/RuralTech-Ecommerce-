const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const orderSchema = new Schema({
  // order fields
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  timestamps: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp) 
  },


});



const Order = model("Order", orderSchema);

module.exports = Order;
