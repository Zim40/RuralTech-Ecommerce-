import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $productName: String!
    $description: String!
    $category: ID!
    $price: Float
    $image: String
    $quantity: Int
  ) {
    addProduct(
      productName: $productName
      description: $description
      category: $category
      price: $price
      image: $image
      quantity: $quantity
    ) {
      productName
      description
      price
      image
      category {
        _id
      }
      quantity
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(_id: $id)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(_id: $id, input: $input) {
      _id
      productName
      description
      price
      image
      category {
        _id
      }
      quantity
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($categoryName: String!, $description: String) {
    addCategory(categoryName: $categoryName, description: $description) {
      _id
      categoryName
      description
      quantity
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(_id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: CategoryInput!) {
    updateCategory(_id: $id, input: $input) {
      _id
      categoryName
      description
      quantity
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($input: AddOrderInput!) {
    addOrder(input: $input) {
      _id
      products {
        product
        quantity
      }
      user
      timestamps
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(_id: $id)
  }
`;

// still need to create update order resolver.
