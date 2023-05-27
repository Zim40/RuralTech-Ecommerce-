const { AuthenticationError } = require("apollo-server-express");
const { User, Category, Order, Products } = require("../models");
const { signToken } = require("../utils/auth");

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
      const products = await Products.find();
      if (!products) {
        console.log(error);
      } else {
        return products;
      }
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
    allOrders: async () => {
      return Order.find();
    },
    singleOrder: async (parent, { _id }) => {
      return Order.findById({ _id });
    },
    statInfo: async () => {
      try {
        const orderCount = await Order.getOrderCount();
        const totalOrderQuantityResult = await Order.getTotalOrderQuantity();
        const totalOrderQuantity =
          totalOrderQuantityResult.length > 0
            ? totalOrderQuantityResult[0].total
            : 0;

        const productCount = await Products.getProductCount();
        const totalProductQuantityResult = await Products.getTotalQuantity();
        const totalProductQuantity =
          totalProductQuantityResult.length > 0
            ? totalProductQuantityResult[0].total
            : 0;

        return {
          orderCount: orderCount,
          totalOrderQuantity: totalOrderQuantity,
          productCount: productCount,
          totalProductQuantity: totalProductQuantity,
        };
      } catch (error) {
        console.log(error);
        throw new Error("Error calculating order quantities.");
      }
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

          await product.save();
          return product;
        }
        
      } catch (error) {
        
        throw new Error("There has been an issue adding your product: " + error);
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
        if (category) {
          return {
            message: "Category already exists with that name.",
          };
        } else {
          category = await Category.create({
            categoryName,
            description,
          });
          await category.save();
          return category;
        }
      } catch (error) {
        throw new Error("Error adding Category.");
      }
    },
    deleteCategory: async (parent, { _id }) => {
      try {
        // Code here -----------------------------
        const deletedCategory = await Category.findByIdAndDelete(_id, {
          new: true,
        });

        if (!deletedCategory) {
          return;
        } else {
          return true;
        }
      } catch (error) {
        throw new Error("Error deleting Category.");
      }
    },
    updateCategory: async (parent, { _id, input }) => {
      try {
        // Code here -----------------------------
        const updatedCategory = await Category.findByIdAndUpdate(
          _id,
          input,
          { new: true },
          { runValidators: true }
        );
        if (updatedCategory) {
          updatedCategory.save();
          return updatedCategory;
        } else {
          throw new Error("Error updating Category.");
        }
      } catch (error) {
        throw new Error("Error updating Category.");
      }
    },

    addOrder: async (parent, { input: { products, user } }, context) => {
      try {
        console.log(user);
        console.log(products);
        const newOrder = await Order.create({
          products,
          user,
        });
        console.log(newOrder);
        return newOrder;
      } catch (error) {
        console.log(error);
        throw new Error("Error adding Order.");
      }
    },

    deleteOrder: async (parent, { _id }) => {
      try {
        // Code here -----------------------------
        const deletedOrder = await Order.findByIdAndDelete(
          _id,
          { new: true },
          { runValidators: true }
        );
        if (!deletedOrder) {
          throw new Error("Could not find that order");
        } else {
          return true;
        }
      } catch (error) {
        throw new Error("Error deleting Order.");
      }
    },
    // updateOrder: async (parent, { _id, input }) => {
    //   try {

    //     const updatedOrder = await Order.findByIdAndUpdate(
    //       _id,
    //       input,
    //       { new: true },
    //       {runValidators: true},
    //     );
    //     if(!updatedOrder) {
    //       console.log(error)
    //       throw new Error('Error updating order.');
    //     }
    //   } catch (error) {
    //     console.error(error)
    //     throw new Error("Error updating Order");
    //   }
    // },
  },
};

module.exports = resolvers;
