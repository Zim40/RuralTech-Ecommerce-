import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ADD_CATEGORY } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import InputGroup from "react-bootstrap/InputGroup";

const AddCategory = () => {
  const styles = {
    button: {
      padding: 5,
      margin: 5,
    },
    div: {
      padding: 30,
      margin: 30,
      border: "1px solid",
      borderRadius: 20,
      
    },
    text: {
      color: 'black',
    }
  };

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
 const [successMessage, setSuccessMessage] = useState("");

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

         setSuccessMessage(
        `${categoryName}` + " successfully added to the database!"
      );
      
      setTimeout(() => {
       setCategoryName("");
      setDescription("");
      
        setSuccessMessage("");
      }, 3000);

     
      

      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="activeForm" style={styles.div}>
        <div >
          <h2>Add Category</h2>
        </div>
        <div className="w-50  ">
          <form onSubmit={handleFormSubmit} className="form">
            <Form.Label htmlFor="inputNewCategory"></Form.Label>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
               Category Name
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setCategoryName(event.target.value)}
                value={categoryName}
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Description
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
              
              
            </InputGroup>
            <Button style={styles.button} variant="success" type="submit">
              Add Category
            </Button>{" "}
          </form>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
          {successMessage && <div style={{ color: "black", fontWeight:300, background: 'green', fontSize: "16px", borderRadius: "5px", margin:5, padding: 5, width: "50%" }}>{successMessage}</div>}
        </div>
      </div>
    </>
  );
};

export default AddCategory;
