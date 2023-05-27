import React, { useState } from "react";

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
  const handleFormSubmit = async () => {
    try {
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
              //   value={}
              //   onChange={}
            >
              <option>Choose a Category to update</option>
              {/* {loadingQuery ? (
                <div>Loading...</div>
              ) : (
                allCategory.map((categories) => (
                  <option key={categories._id} value={categories._id}>
                    {categories.categoryName}
                  </option>
                ))
              )}
              ; */}
            </Form.Select>
            <Button style={styles.button} variant="danger" type="submit">
              DELETE Product
            </Button>{" "}
          </form>
          {/* {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
