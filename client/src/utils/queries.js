import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      role
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
    }
  }
`;

export const STAT_INFO = gql`
query StatInfo {
  statInfo {
    productCount
    totalProductQuantity
    orderCount
    totalOrderQuantity
  }
}
`;





export const QUERY_ALLPRODUCTS = gql`
query Query {
  allProducts {
    _id
    productName
    description
    price
    image
    quantity
  }
}
`;

export const QUERY_SINGLEPRODUCT = gql`
query Query($id: ID!) {
  singleProduct(_id: $id) {
    _id
    productName
    description
    price
    image
    quantity
  }
}
`;

export const QUERY_ALLCATEGORY = gql`
query Query {
  allCategory {
    _id
    categoryName
    description
    quantity
  }
}
`;

export const QUERY_SINGLECATEGORY= gql`
query Query($id: ID!) {
  singleCategory(_id: $id) {
    _id
    categoryName
    description
    quantity
  }
}
`;

export const QUERY_ALLORDERS= gql`
query Query {
  allOrders {
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

export const QUERY_SINGLEORDER= gql`
query Query($id: ID!) {
  singleOrder(_id: $id) {
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

