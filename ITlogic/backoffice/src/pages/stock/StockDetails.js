import React from "react";
import StockDetailsHeader from "./StockDetailsHeader";
import StockDetailsTable from "./StockDetailsTable";

import { StockProvider } from "../../context/StockState";

const StockDetails = () => {
  return (
    <StockProvider>
      <StockDetailsHeader />
      <StockDetailsTable />
    </StockProvider>
  );
};

export default StockDetails;
