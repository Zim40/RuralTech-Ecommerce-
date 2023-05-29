import React from "react";

import Button from "react-bootstrap/Button";

import DashboardList from "../components/DashboardList.js";
import InventoryList from "../components/inventoryList/index.js";
import { STAT_INFO } from "../utils/queries";
import { useQuery } from "@apollo/client";

const styles = {
  button: {
    margin: 10,
    padding: 5,
    border: "1px solid",
    borderColor: "black",
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
    width: "50%",
  },
};
const AdminDash = () => {
  // dashboard admin table
  const { loading, data } = useQuery(STAT_INFO);

  const statInfo = data?.statInfo || [];

  console.log(statInfo);

  return (
    <div>
      <div className="" style={styles.div}>
        <h2 style={styles.title}>Dashboard</h2>
        <p className="" style={styles.text}>
          From the dashboard you can control Product Management and alter
          specific items and categories, start by choosing an option below.
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DashboardList statInfo={statInfo} />
        )}
        <InventoryList />
        <Button style={styles.button} variant="primary" size="lg" active>
          Products
        </Button>{" "}
        <Button style={styles.button} variant="primary" size="lg" active>
          Categories
        </Button>{" "}
        
      </div>
    </div>
  );
};

export default AdminDash;
