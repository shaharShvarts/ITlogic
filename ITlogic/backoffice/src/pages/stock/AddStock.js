import React, { useState } from "react";
import AddStockHeader from "./AddStockHeader";
import AddStockTable from "./AddStockTable";

import { StockProvider } from "../../context/StockState";

const AddStock = ({ history }) => {
  const [addStockDb, setAddStockDb] = useState([]);

  return (
    <StockProvider>
      <AddStockHeader history={history} setAddStockDb={setAddStockDb} />
      <AddStockTable setAddStockDb={setAddStockDb} addStockDb={addStockDb} />
    </StockProvider>
  );
};

export default AddStock;

//<Stock history={history} />
