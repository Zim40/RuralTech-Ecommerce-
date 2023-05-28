import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { QUERY_ALLCATEGORY } from "../../utils/queries";
import { QUERY_ALLPRODUCTS } from "../../utils/queries";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

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

const UpdateProduct = () => {

  const { loading: loadingQuery, data: dataQuery } =
    useQuery(QUERY_ALLPRODUCTS);
  const allProducts = dataQuery?.allProducts || [];

  const { loading: queryLoading, data: queryData } =
    useQuery(QUERY_ALLCATEGORY);
  const allCategory = queryData?.allCategory || [];

  const [updateProduct, { error }] = useMutation(UPDATE_PRODUCT);

  const [productId, setProductId] = useState("");
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
      const { data } = await updateProduct({
        variables: {
          id: productId,
          input: {
          productName,
          description,
          price: formattedPrice,
          category: {
            _id: category
          },
          quantity: formattedQuantity,
        }
        },
      });
      console.log(data);


      setSuccessMessage(`${productName}` + " successfully Updated");

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

  return (
    <>
      <div style={styles.div}>
        <div>
          <h2>Update Product</h2>
        </div>
        <div className="w-50">
          <Form onSubmit={handleFormSubmit} className="form">
            <Form.Label htmlFor="inputrProductName">Product Name</Form.Label>
            <Form.Select
              style={styles.textArea}
              //   className="w-50"
              aria-label="Default select example"
              name="productId"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              <option>Choose a Product to UPDATE</option>
              {loadingQuery ? (
                <div>Loading...</div>
              ) : (
                allProducts.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.productName}
                  </option>
                ))
              )}
              ;
            </Form.Select>
            <Form.Label htmlFor="inputrProductName">Product Name</Form.Label>
            <Form.Control
              type="input"
              id="inputProductName"
              aria-describedby="inputProductName"
              name="productName"
              onChange={(event) => setProductName(event.target.value)}
              value={productName}
            />
            <Form.Text id="inputProductName" muted></Form.Text>
            <Form.Label htmlFor="inputDescription">Description</Form.Label>
            <Form.Control
              type="input"
              id="inputDescription"
              aria-describedby="inputDescription"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
            <Form.Text id="inputProductPrice" muted></Form.Text>
            <Form.Label htmlFor="inputProductPrice">Price</Form.Label>
            <Form.Control
              type="number"
              id="inputProductPrice"
              aria-describedby="inputProductPrice"
              onChange={(event) => setPrice(event.target.value)}
              value={price}
            />
            <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
            <Form.Control
              type="number"
              id="inputQuantity"
              aria-describedby="inputQuantity"
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
            />
            <Form.Label htmlFor="inputNewCategory">Choose Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(event) => setCategory(event.target.value)}
              value={category}
            >
              <option>Update Category:</option>
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
          </Form>
        </div>
        {error && (
          <div className="col-12 my-3 bg-danger text-white p-3">
            Something went wrong...
          </div>
        )}
        {successMessage && (
          <div style={{ color: "black" }}>{successMessage}</div>
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
