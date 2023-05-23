const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
  }

  type Category {
    _id: ID
    categoryName: String!
    description: String!
    quantity: Int
  }

  input CategoryInput {
    _id: ID
    categoryName: String
    description: String
    quantity: Int
  }

  type Products {
    _id: ID
    productName: String!
    description: String
    price: Float!
    image: String
    category: Category!
    quantity: Int
  }

  input ProductInput {
    _id: ID
    productName: String
    description: String
    price: Float
    image: String
    category: CategoryInput
    quantity: Int


  }

  type OrderProduct {
    product: ID!
    quantity: Int!
  }

  type Order {
    _id: ID
    products: [OrderProduct]!
    user: ID!
    timestamps: String!
  }

  type Auth {
    token: ID!
    user: User
  }

 

  input AddOrderProductInput {
  product: ID!
  quantity: Int
  }

  input AddOrderInput {
  products: [AddOrderProductInput]!
  user: ID!
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User

    allProducts: [Products]
    singleProduct(_id: ID!): Products
    
    allCategory: [Category]
    singleCategory(_id: ID!): Category

    
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addProduct(productName: String!, description: String!, price: Float, image: String, category: ID!, quantity: Int!): Products
    deleteProduct(_id: ID!): Boolean
    updateProduct(_id: ID!, input: ProductInput): Products

    addCategory(categoryName: String!, description: String): Category!
    deleteCategory(_id: ID!): Boolean
    updateCategory(_id: ID!, input: CategoryInput!): Category

    addOrder(input: AddOrderInput!): Order!
    deleteOrder(_id: ID!): Boolean
    updateOrder(_id: ID!, products: [AddOrderProductInput]!): Order!







  }
`;

module.exports = typeDefs;
