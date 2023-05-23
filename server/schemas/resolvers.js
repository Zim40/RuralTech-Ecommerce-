const { AuthenticationError } = require('apollo-server-express');
const { 
  User,
  Category,
  Order,
  Products
 } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    allProducts: async () => {
      return Products.find();
    },
    singleProduct: async (parent, { _id }) => {
      return Products.findOne({ _id });
    },
    allCategory: async () => {
      return Category.find();
    },
    singleCategory: async (parent, { _id }) => {
      return Category.findById({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (user.role === "ADMIN") {
        console.log("Welcome Admin");
      } else {
        console.log("Welcome User!");
      }
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addProduct: async (
      parent,
      { productName, description, price, image, category, quantity }
    ) => {
      try {
        // Checks for products already in the DB with the same name, adds quantity instead of another product of the same name. If no product of the same name, create a new product with user input.
        let product = await Products.findOne({ productName });

        if (product) {
          product.quantity += quantity;
        } else {
          product = await Products.create({
            productName,
            description,
            price,
            image,
            category,
            quantity,
          });
        }
        await product.save();
        return product;
      } catch (error) {
        throw new Error("There has been an issue adding your product.");
      }
    },
    deleteProduct: async (parent, { _id }) => {
      try {
        const product = await Products.findByIdAndDelete({ _id });
        if (product) {
          await Category.findByIdAndUpdate(
            product.category._id,
            { $inc: { quantity: -product.quantity } },
            { new: true }
          );
        }
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Product.");
      }
    },
    updateProduct: async (parent, { _id, input }) => {
      try {
        const updatedProduct = await Products.findByIdAndUpdate(
          _id,
          input,
          { new: true },
          { runValidators: true }
        );

        if (updatedProduct) {
          updatedProduct.save();
          return updatedProduct;
        } else {
          throw new Error("Product not found.");
        }
      } catch (error) {
        throw new Error("Could not update Product");
      }
    },
    addCategory: async (parent, { categoryName, description }) => {
      try {
        let category = await Category.findOne({ categoryName });
        if(category) {
          return;
        } else {
         category = await Category.create({
            categoryName,
            description,
            quantity,
          });
          await category.save();
          return category;
        }
      } catch (error) {
        
        throw new Error('Error adding category.');
      }
    }
  },
};

module.exports = resolvers;
