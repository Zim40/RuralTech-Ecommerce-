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
          <Form.Label htmlFor="inputNewCategory">Product Name</Form.Label>
          <Form.Control
            type="input"
            id="inputCategory"
            aria-describedby="inputCategory"
          />
          <Form.Text id="inputCategory" muted></Form.Text>
          <Form.Label htmlFor="inputNewCategory">Description</Form.Label>
          <Form.Control
            type="input"
            id="inputCategory"
            aria-describedby="inputCategory"
          />
          <Form.Text id="inputCategory" muted></Form.Text>
          <Form.Label htmlFor="inputNewCategory">Price</Form.Label>
          <Form.Control
            type="input"
            id="inputCategory"
            aria-describedby="inputCategory"
          />
          <Form.Text id="inputCategory" muted></Form.Text>
          <Form.Label htmlFor="inputNewCategory">Image</Form.Label>
          <Form.Control
            type="input"
            id="inputCategory"
            aria-describedby="inputCategory"
          />
          <Form.Text id="inputCategory" muted></Form.Text>
         
          <Form.Label htmlFor="inputNewCategory">Product Name</Form.Label>
          <Form.Control
            type="input"
            id="inputCategory"
            aria-describedby="inputCategory"
          />
          <Form.Text id="inputCategory" muted></Form.Text>
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
