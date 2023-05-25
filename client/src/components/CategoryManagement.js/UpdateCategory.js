import React from "react";
import Form from "react-bootstrap/Form";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { Navigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const UpdateCategory = () => {
  const styles = {
    div: {
      padding: 30,
      margin: 30,
      border: "1px solid",
      borderRadius: 20,
      
    },
    textArea: {
      margin: 5,
    },
    button: {
      padding: 5,
      marginTop: 5,
  
    },
  };
  const { loading, data } = useQuery(QUERY_ALLCATEGORY);

  const allCategory = data?.allCategory || [];

  if (Auth.loggedIn()) {
    return (
      <>
        <div style={styles.div}>
          <div>
            <h2>Update Category</h2>
          </div>
          <div className="w-50">
            <Form.Select
              style={styles.textArea}
            //   className="w-50"
              aria-label="Default select example"
            >
              <option>Choose a Category to update</option>
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
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Update Category Name
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Update Description
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </InputGroup>
            <Button style={styles.button}  variant="success">Update Category</Button>{" "}
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default UpdateCategory;
