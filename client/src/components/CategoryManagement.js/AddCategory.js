import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ADD_CATEGORY } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const AddCategory = () => {
  const styles = {
    button: {
      float: "right",
      padding: 5,
      margin: 5,
    },
    div: {
      padding: 30,
      margin: 30,
      border: "1px solid",
      borderRadius: 20,
    },
  };

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [addCategory, { error }] = useMutation(ADD_CATEGORY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCategory({
        variables: {
          categoryName,
          description,
        },
      });

      setCategoryName("");
      setDescription("");
      window.location.reload();

      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={styles.div}>
        <div>
          <h2>Add Category</h2>
        </div>
        <div className="w-50  ">
          <form onSubmit={handleFormSubmit} className="addCategoryForm">
            <Form.Label htmlFor="inputNewCategory">Category Name</Form.Label>
            <Form.Control
              type="text"
              name="categoryName"
              value={categoryName}
              id="inputCategory"
              aria-describedby="inputCategory"
              onChange={(event) => setCategoryName(event.target.value)}
            />
            <Form.Text id="inputCategory" muted>
              Insert Category name
            </Form.Text>
            <Form.Control
              type="text"
              name="description"
              value={description}
              id="inputCategory"
              aria-describedby="inputCategory"
              onChange={(event) => setDescription(event.target.value)}
            />
            <Form.Text id="categoryDescription" muted>
              Add a description for new category
            </Form.Text>
            <Button style={styles.button} variant="success" type="submit">
              Add Category
            </Button>{" "}
          </form>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
