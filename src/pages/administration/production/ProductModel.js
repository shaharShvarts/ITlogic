import React from "react";

import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const ProductModel = ({ modelContent, modelData, setIsOpen }) => {
  if (modelContent === "edit") {
    return <EditProduct modelData={modelData} setIsOpen={setIsOpen} />;
  }

  if (modelContent === "delete") {
    return <DeleteProduct modelData={modelData} setIsOpen={setIsOpen} />;
  }
};

export default ProductModel;
