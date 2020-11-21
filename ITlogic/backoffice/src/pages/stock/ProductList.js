import React from "react";

const ProductList = ({ productNames }) => {
  return productNames.map((product) => (
    <option key={product._id} value={product._id}>
      {product.name}
    </option>
  ));
};

export default ProductList;
