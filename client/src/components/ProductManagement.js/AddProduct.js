import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { ADD_PRODUCT } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import InputGroup from "react-bootstrap/InputGroup";

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

  const { loading: queryLoading, data: queryData } =
    useQuery(QUERY_ALLCATEGORY);
  const allCategory = queryData?.allCategory || [];

  const [addProduct, { error }] = useMutation(ADD_PRODUCT);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const [image, setImage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const formattedPrice = parseFloat(price);
      const formattedQuantity = parseInt(quantity);
      // form submit code
      const { data } = await addProduct({
        variables: {
          productName,
          description,
          price: formattedPrice,
          category,
          quantity: formattedQuantity,
        },
      });
      
      setSuccessMessage(
        "✔"
      );

      // console.log(data);

      setTimeout(() => {
        setProductName("");
        setDescription("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
      throw new Error("error handling submit form:" + error);
    }
  };
  //  productName,
  // description,
  // price,
  // image,
  // category,
  // quantity,

  return (
    <div className="activeForm" style={styles.div}>
      <div>
        <h2>Add Product</h2>
      </div>
      <div className="w-50">
        <form onSubmit={handleFormSubmit} className="form">
        <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Product Name:
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setProductName(event.target.value)}
                value={productName}
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Description:
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
                Price: $
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setPrice(event.target.value)}
                value={price}
              />
            </InputGroup>
            <InputGroup style={styles.textArea} className="mb-3 ">
              <InputGroup.Text id="inputGroup-sizing-default">
               Quantity:
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                onChange={(event) => setQuantity(event.target.value)}
                value={quantity}
              />
            </InputGroup>
      
          <Form.Select
            aria-label="Default select example"
            onChange={(event) => setCategory(event.target.value)}
            value={category}
          >
            <option>Select Category to add new product to:</option>
            {queryLoading ? (
              <div>Loading...</div>
            ) : (
              allCategory.map((categories) => (
                <option key={categories._id} value={categories._id}>
                  {categories.categoryName}
                </option>
              ))
            )}
          </Form.Select>
          <Button style={styles.button} variant="success" type="submit">
            Add Product
          </Button>{" "}
        </form>
      </div>
      {error && (
        <div className="col-12 my-3 bg-danger text-white p-3">
          Something went wrong...
        </div>
      )}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default AddProduct;
