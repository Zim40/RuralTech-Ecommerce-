import React, { useState } from "react";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { QUERY_ALLPRODUCTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Navigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useQuery } from "@apollo/client";
const styles = {
    table: {
        marginTop: 20,
        padding:0,
    }
}

const InventoryList = () => {
  const { loading: loadingQuery, data: queryData } =
    useQuery(QUERY_ALLCATEGORY);
  const allCategory = queryData?.allCategory || [];

  const { loading, data } = useQuery(QUERY_ALLPRODUCTS);
  const allProducts = data?.allProducts || [];

  if (Auth.loggedIn()) {
    return (
        
      <Table striped bordered hover variant="dark" style={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            {loadingQuery ? (
              <div>loading...</div>
            ) : (
              allCategory.map((categories) => (
                <th key={categories._id} value={categories._id}>
                  {categories.categoryName}
                </th>
              ))
            )}
            ;
          </tr>
        </thead>
        <tbody>
        {loading ? (
    <div>loading...</div>
  ) : (
    allProducts.map((product, index) => (
      <tr key={product._id}>
        <td>{index + 1}</td>
        <td>{product.productName}<br></br>
            {'$'+product.price}<br></br>
            {'stock: '+product.quantity}<br></br>
            </td>
   
        {allCategory.map((category) => (
          <td key={category._id}>
            {product.category && product.category._id === category._id
              ? "✔️"
              : ""}
          </td>
        ))}
      </tr>
    ))
  )}
        </tbody>
      </Table>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default InventoryList;
