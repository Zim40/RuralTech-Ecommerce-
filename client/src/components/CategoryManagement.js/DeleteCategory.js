import React, { useState } from "react";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { DELETE_CATEGORY } from "../../utils/mutations";
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
const DeleteCategory = () => {
  const { loading: loadingQuery, data: dataQuery } =
    useQuery(QUERY_ALLCATEGORY);
  const [deleteCategory, { error }] = useMutation(DELETE_CATEGORY);

  const allCategory = dataQuery?.allCategory || [];

  const [categoryId, setCategoryId] = useState("");
  console.log(categoryId);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await deleteCategory({
        variables:{
          id: categoryId
        }
      });
      console.log(data)
      setCategoryId('');
      window.location.reload();

      console.log("Success!");
    } catch (err) {
      console.log(err);
      throw new Error("Error handling form submit");
    }
    
  };

  return (
    <div style={styles.div}>
      <div>
        <h2>Delete Category</h2>
        <p>
          WARNING!: Once a category has been deleted, it will be lost forever.
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
            name="categoryId"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
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
          <Button style={styles.button} variant="danger" type="submit">
            DELETE Category
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
};

export default DeleteCategory;
