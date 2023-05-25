import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


const AddCategory = () => {

  const styles = {
    button: {
      float: 'right',
      padding: 5,
      margin: 5
    },
    div: {
      padding: 30,
      margin: 30,
      border: '1px solid',
      borderRadius: 20
    },
  }

    return (
      <>
        <div style={styles.div}>
          <div>
            <h2>Add Category</h2>
          </div>
          <div className="w-50  ">
            <Form.Label htmlFor="inputNewCategory">Category Name</Form.Label>
            <Form.Control
              type="input"
              id="inputCategory"
              aria-describedby="inputCategory"
            />
            <Form.Text id="inputCategory" muted>
              Insert Category name
            </Form.Text>
            <Form.Control
              type="input"
              id="inputCategory"
              aria-describedby="inputCategory"
            />
            <Form.Text id="categoryDescription" muted>
              Add a description for new category
            </Form.Text>
            <Button style={styles.button} variant="success">
              Add Category
            </Button>{" "}
          </div>
        </div>
      </>
    );

};

export default AddCategory