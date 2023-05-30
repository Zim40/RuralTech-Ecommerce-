import React, { useState } from "react";

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
    fontSize: 45,
  },
  text: {
    width: "50%",
  },
};
const AdminDash = () => {
  // dashboard admin table

  const { loading, data } = useQuery(STAT_INFO);

  const statInfo = data?.statInfo || [];

  const [showInventory, setShowInventory] = useState(false);

  const toggleInventory = () => {
    setShowInventory(!showInventory);
  };
  const [relaodCount, setReloadCount] = useState(0);

  const handleReload = () => {
    setReloadCount(relaodCount + 1);
  };

  return (
    <div>
      <div className="activeForm" style={styles.div}>
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
        <Button
          onClick={toggleInventory}
          style={styles.button}
          variant="primary"
          size="lg"
          active
        >
          View Inventory
        </Button>{" "}
        {showInventory && <InventoryList />}
      </div>
    </div>
  );
};

export default AdminDash;
