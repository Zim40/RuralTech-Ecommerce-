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
    padding: 0,
  },
};

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
              <th>loading...</th>
            ) : (
              allCategory.map((category) => (
                <th key={category._id}>{category.categoryName}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={allCategory.length + 1}>loading...</td>
            </tr>
          ) : (
            allProducts.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>

                {allCategory.map((category) => {
                  return (
                    <td key={category._id}>
                      {product.category === category._id
                        ? product.productName
                        : ""}{product.productName}
                    </td>
                  );
                })}
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
