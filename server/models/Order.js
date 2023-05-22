const { Schema, model } = require('mongoose');
const { formatTimestamp } = require('../utils/dateFormat');

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
  type: String,
  required: true,
 },



  formattedTimestamp: {
    type: String,
  },
});


orderSchema.pre('save', function(next) {
    const formattedTimestamp = formatTimestamp(this.createdAt, {
        monthLength: 'long',
        dateSuffix: true,
    });
    this.formattedTimestamp = formattedTimestamp;
    next();
});

const Order = model('Order', orderSchema);

module.exports = Order;