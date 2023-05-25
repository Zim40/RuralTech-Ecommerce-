import React from "react";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { useQuery } from "@apollo/client";
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
      margin: 5
  },
};
const DeleteCategory = () => {
  const { loading, data } = useQuery(QUERY_ALLCATEGORY);

  const allCategory = data?.allCategory || [];

  return (
    
      <div style={styles.div}>
        <div>
          <h2>Delete Category</h2>
          <p>
            WARNING!: Once a category has been deleted, it will be lost forever.
          </p>
        </div>
        <div>
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
        </div>
        <Button style={styles.button} variant="danger">
          DELETE Category
        </Button>{" "}
      </div>
    
  );
};

export default DeleteCategory;
