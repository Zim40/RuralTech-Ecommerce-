import React, { useState, useEffect } from "react";
import { QUERY_ALLPRODUCTS } from "../../utils/queries";
import { DELETE_PRODUCT } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const styles = {
  div: {
    padding: 30,
    margin: 30,
    border: "1px solid",
    borderRadius: 20,
  },
  // textArea: {
  //   margin: 5,
  // },
  button: {
    // float: "right",
    padding: 5,
    margin: 5,
  },
};

const DeleteProduct = () => {
  const { loading: loadingQuery, data: dataQuery } =
    useQuery(QUERY_ALLPRODUCTS);
  const allProducts = dataQuery?.allProducts || [];

  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT);

  const [productId, setProductId] = useState("");
  const [availableProducts, setAvailableProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setAvailableProducts(allProducts);
  }, [allProducts]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await deleteProduct({
        variables: {
          id: productId,
        },
      });
      setAvailableProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      setSuccessMessage("Product deleted from the database!");

      setTimeout(() => {
        setProductId("");
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      throw new Error("Error handling form submit: " + error);
    }
  };

  return (
    <>
      <div style={styles.div}>
        <div>
          <h2>Delete Product</h2>
          <p>
            WARNING!: Once a Product has been deleted, it will be lost forever.
          </p>
        </div>
        <div>
          <form
            className="form"
            type="form"
            name="deleteForm"
            onSubmit={handleFormSubmit}
          >
            <Form.Select
              style={styles.textArea}
              //   className="w-50"
              aria-label="Default select example"
              name="productId"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              <option>Choose a Product to DELETE</option>
              {loadingQuery ? (
                <div>Loading...</div>
              ) : (
                availableProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.productName}
                  </option>
                ))
              )}
              ;
            </Form.Select>
            <Button style={styles.button} variant="danger" type="submit">
              DELETE Product
            </Button>{" "}
          </form>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
          {successMessage && (
            <div style={{ color: "black" }}>{successMessage}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
