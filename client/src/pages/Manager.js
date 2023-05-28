import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import AddCategory from "../components/CategoryManagement.js/AddCategory";
import DeleteCategory from "../components/CategoryManagement.js/DeleteCategory";
import UpdateCategory from "../components/CategoryManagement.js/UpdateCategory";
import AddProduct from "../components/ProductManagement.js/AddProduct";
import UpdateProduct from "../components/ProductManagement.js/UpdateProduct";
import DeleteProduct from "../components/ProductManagement.js/DeleteProduct";

const Manager = () => {
  // Logic code here

  const styles = {
    buttonsGroup: {
      paddingTop: 30,
      margin: 0,
      color: 'white',
      // borderRadius: '10px'
    },
    button: {
      borderRadius: 10,
      border: '1px solid',
      borderColor: 'black',
      background: 'darkgrey',
      color: 'black'
    },
    div: {
      padding: 30,
      margin: 30,
      border: "1px solid",
      borderRadius: 20,
      
      
    },
    title: {
      fontWeight: "bold",
      fontSize: 45,
    },
    text: {
      fontSize: 20,
      width: '100%',
      color: 'white'
    }
  };

  const [selectedButton, setSelectedButton] = useState("");

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  return (
    <>
      
        <div style={styles.div}>
          <div>
            <h2 style={styles.title}>Manager</h2>
          </div>
          <div>
            <p style={styles.text}>The Product/Manager page on your ecommerce site gives you complete control over your product catalog. You can easily create, update, and delete products and categories. It helps you organize your products, set their prices, and add descriptions and images. You can also make bulk changes to save time. This page allows you to manage your catalog efficiently and provide a great shopping experience for your customers.</p>
          </div>
          <ButtonGroup
            style={styles.buttonsGroup}
            // vertical
            className="d-flex gap-2 75"
          >
            <Button style={styles.button}
              onClick={() => handleButtonClick(1)}
              active={selectedButton === 1}
              variant="primary"
            >
              Add Category
            </Button>{" "}
            <Button style={styles.button}
              onClick={() => handleButtonClick(2)}
              active={selectedButton === 2}
              variant="primary"
            >
              Update Category
            </Button>{" "}
            <Button style={styles.button}
              onClick={() => handleButtonClick(3)}
              active={selectedButton === 3}
              variant="primary"
            >
              Delete Category
            </Button>{" "}
            <Button style={styles.button}
              onClick={() => handleButtonClick(4)}
              active={selectedButton === 4}
              variant="primary"
            >
              Add Product
            </Button>{" "}
            <Button style={styles.button}
              onClick={() => handleButtonClick(5)}
              active={selectedButton === 5}
              variant="primary"
            >
              Update Product
            </Button>{" "}
            <Button style={styles.button}
              onClick={() => handleButtonClick(6)}
              active={selectedButton === 6}
              variant="primary"
            >
              Delete Product
            </Button>{" "}
          </ButtonGroup>

          <div >
            {selectedButton === 1 && (
              <AddCategory  />
            )}
          </div>
          <div >
            {selectedButton === 2 && (
              <UpdateCategory  />
            )}
          </div>
          <div >
            {selectedButton === 3 && (
              <DeleteCategory  />
            )}
          </div>
          <div >
            {selectedButton === 4 && (
              <AddProduct  />
            )}
          </div>
          <div >
            {selectedButton === 5 && (
              <UpdateProduct  />
            )}
          </div>
          <div >
            {selectedButton === 6 && (
              <DeleteProduct  />
            )}
          </div>
        </div>
      
    </>
  );
};

export default Manager;
