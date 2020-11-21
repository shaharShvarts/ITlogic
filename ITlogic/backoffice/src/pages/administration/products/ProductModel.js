import React from "react";

import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const ProductModel = ({ modelContent, modelData, setIsOpen }) => {
  switch (modelContent) {
    case "edit":
      return <EditProduct modelData={modelData} setIsOpen={setIsOpen} />;
    case "delete":
      return <DeleteProduct modelData={modelData} setIsOpen={setIsOpen} />;
    default:
      break;
  }
};

export default ProductModel;
