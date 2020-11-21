import React from "react";

import NewProduct from "./NewProduct";
import ProductsTable from "./ProductsTable";
import "./Products.css";

import { ProductsProvider } from "../../../context/ProductsState";
import { CategoriesProvider } from "../../../context/CategoriesState";

const Products = () => {
  return (
    <CategoriesProvider>
      <ProductsProvider>
        <NewProduct />
        <ProductsTable />
      </ProductsProvider>
    </CategoriesProvider>
  );
};
export default Products;
