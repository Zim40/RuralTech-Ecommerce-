import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { UPDATE_CATEGORY } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

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
  const { loading: loadingQuery, data: queryData } =
    useQuery(QUERY_ALLCATEGORY);

  const allCategory = queryData?.allCategory || [];

  const [updateCategory, { error }] = useMutation(UPDATE_CATEGORY);

  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateCategory({
        variables: {
          id: categoryId,
          input: {
            categoryName,
            description,
          },
        },
      });

      setCategoryId("");
      setCategoryName("");
      setDescription("");
      setIsSubmitted(false);
      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  };

  // _id
  // categoryName - change name
  // description - change description

  if (Auth.loggedIn()) {
    return (
      <div style={styles.div}>
        <div>
          <h2>Update Category</h2>
        </div>
        <div className="w-50">
          <form onSubmit={handleFormSubmit} className="form">
            <Form.Select
              style={styles.textArea}
              onChange={(event) => setCategoryId(event.target.value)}
              aria-label="Default select example"
              value={categoryId}
            >
              <option>Choose a Category to update</option>
              {loadingQuery ? (
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
                onChange={(event) => setCategoryName(event.target.value)}
                value={categoryName}
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Update Description
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
              {isSubmitted && (
                <Form.Control.Feedback type="valid">
                  <span style={{ color: "green" }}>✔</span> Success
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Button style={styles.button} variant="success" type="submit">
              Update Category
            </Button>{" "}
          </form>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              Something went wrong...
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default UpdateCategory;
