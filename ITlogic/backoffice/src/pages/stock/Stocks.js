import React from "react";
import StockTable from "./StockTable";
import StockHeader from "./StockHeader";
import "./Stock.css";

import { StockProvider } from "../../context/StockState";

const Stock = () => {
  return (
    <StockProvider>
      <StockHeader />
      <StockTable />
    </StockProvider>
  );
};

export default Stock;
