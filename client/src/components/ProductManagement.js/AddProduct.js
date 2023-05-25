import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const AddProduct = () => {
  const styles = {
    button: {
      //   float: "right",
      padding: 5,
      marginTop: 10,
    },
    div: {
      padding: 30,
      margin: 30,
      border: "1px solid",
      borderRadius: 20,
    },
  };

  const { loading, data } = useQuery(QUERY_ALLCATEGORY);

  const allCategory = data?.allCategory || [];

  return (
    <>
      <div style={styles.div}>
        <div>
          <h2>Add Product</h2>
        </div>
        <div className="w-50">
          <Form.Label htmlFor="inputrProductName">Product Name</Form.Label>
          <Form.Control
            type="input"
            id="inputProductName"
            aria-describedby="inputProductName"
          />
          <Form.Text id="inputProductName" muted></Form.Text>
          <Form.Label htmlFor="inputDescription">Description</Form.Label>
          <Form.Control
            type="input"
            id="inputDescription"
            aria-describedby="inputDescription"
          />
          <Form.Text id="inputProductPrice" muted></Form.Text>
          <Form.Label htmlFor="inputProductPrice">Price</Form.Label>
          <Form.Control
            type="input"
            id="inputProductPrice"
            aria-describedby="inputProductPrice"
          />
          <Form.Text id="inputProductPrice" muted></Form.Text>
          <Form.Label htmlFor="inputImage">Image</Form.Label>
          <Form.Control
            type="input"
            id="inputImage"
            aria-describedby="inputImage"
          />
          <Form.Text id="inputImage" muted></Form.Text>
         
          <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
          <Form.Control
            type="input"
            id="inputQuantity"
            aria-describedby="inputQuantity"
          />
          <Form.Text id="inputQuantity" muted></Form.Text>
          <Form.Label htmlFor="inputNewCategory">Choose Category</Form.Label>
          <Form.Select
            //   style={styles.textArea}
            //   className="w-50"
            aria-label="Default select example"
          >
            <option>Select Category to add new product to:</option>
            {loading ? (
              <div>Loading...</div>
            ) : (
              allCategory.map((categories) => (
                <option key={categories._id} value={categories._id}>
                  {categories.categoryName}
                </option>
              ))
            )}
            ;
          </Form.Select>
          <Button style={styles.button} variant="success">
            Add Product
          </Button>{" "}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
